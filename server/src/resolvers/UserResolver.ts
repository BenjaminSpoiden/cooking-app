import { User } from '../entities/User'
import { Arg, Ctx, Field, InputType, Int, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import argon2 from 'argon2'
import { FieldErrors } from '../errors/CustomError'
import { MyContext } from '../utils/types'
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants'
import { sendEmail } from '../utils/sendEmail'
import cache from "../utils/ModuleBinder"

@InputType()
class RegisterUserInput {
    @Field()
    username: string

    @Field()
    password: string

    @Field()
    email: string
}

@InputType()
class LoginUserInput {
    @Field()
    username: string

    @Field()
    password: string
}


@ObjectType()
class UserReponse {
    @Field(() => [FieldErrors], { nullable: true })
    errors?: FieldErrors[]

    @Field(() => User, { nullable: true })
    user?: User
}

@Resolver()
export class UserResolver {

    @Mutation(() => UserReponse)
    async changePassword(
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string,
        @Ctx() {req}: MyContext
    ): Promise<UserReponse> {
        if(newPassword.length < 8) {
            return {
                errors: [
                    {
                        field: "resetPassword",
                        message: "The password must be atleast 8 characters."
                    }
                ]
            }
        }

        const key = FORGET_PASSWORD_PREFIX + token
        const userID = await cache.get(key)
        if(!userID) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "Token expired"
                    }
                ]
            }
        }

        const currentUser = await User.findOne<User>({id: parseInt(userID)})
        if(!currentUser) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "User no longer exists"
                    }
                ]
            }
        }

        currentUser.password = await argon2.hash(newPassword)
        await currentUser.save()

        await cache.del(key)

        req.session.userId = currentUser.id

        return {
            user: currentUser
        }
    }


    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string,
        @Ctx() {  }: MyContext
    ) {
        const user = await User.findOne<User>({ email })
        if(!user) {
            return false
        }
        
        const token = user.uuid
       
        await cache.set(FORGET_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 180)
        await sendEmail(
            email, 
            `<a href="http://localhost:3000/change-password/${token}" >Reset Password</a>`
        )

        return true
    }

    // *** CRUD ***
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        return await User.find<User>()
    }

    @Query(() => User)
    async getUser(
        @Arg("id", () => Int)
        id: number
    ): Promise<User | undefined> {
        return await User.findOne<User>({ id })
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Arg("id", () => Int)
        id: number
    ): Promise<boolean> {
        
        try {
            await User.delete<User>({ id })
            return true
        }catch {
            return false
        }
        
    }
    
    // *** REGISTRATION AND LOGGING ***
    @Mutation(() => UserReponse)
    async registerUser(
        @Arg("userCreds") 
        userCreds: RegisterUserInput,
        @Ctx() { req }: MyContext
    ): Promise<UserReponse> {
        
        
        if(userCreds.username.length <= 3) {
            return {
                errors: [{
                    field: 'username',
                    message: "The username must be atleast 3 characters"
                }]
            }
        }
        if(userCreds.password.length < 8) {
            return {
                errors: [{
                    field: 'password',
                    message: "The password must be atleast 8 characters"
                }]
            }
        }        
        

        const hashedPassword = await argon2.hash(userCreds.password)

        let user = undefined

        try {
            const registeredUser = await User
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    username: userCreds.username,
                    password: hashedPassword,
                    email: userCreds.email
                })
                .returning('*')
                .updateEntity(true)
                .execute()

            user = registeredUser.generatedMaps[0] as User
        }catch(error) {
            if(error.routine === '_bt_check_unique') {
                return {
                    errors: [{
                        field: "username",
                        message: "The user already exist"
                    }]
                }
            }
        } 
        req.session.userId = user?.id
        return {
            user: user
        }       
    }

    @Mutation(() => UserReponse)
    async loginUser(
        @Arg("userCreds")
        userCreds: LoginUserInput,
        @Ctx() { req }: MyContext
    ): Promise<UserReponse> {

        const user = await User.findOne<User>({ username: userCreds.username.toLowerCase() })
        if(!user) {
            return {
                errors: [{
                    field: 'username',
                    message: "The username doesn't exist"
                }]
            }
        }
        
        const validPassword = await argon2.verify(user.password, userCreds.password)
        
        if(!validPassword) {
            return {
                errors: [{
                    field: 'password',
                    message: "The passwords did not match"
                }]
            }
        }else {
            req.session.userId = user.id
            return {
                user
            }
        }
    }

    @Query(() => User, {nullable: true})
    async currentUser(
        @Ctx() { req }: MyContext
    ) {
        if(!req.session.userId) {
            return null
        }

        const user = await User.findOne<User>( {id: req.session.userId} )
        return user
    }

    @Mutation(() => Boolean)
    logoutUser(
        @Ctx() { req, res }: MyContext
    ) {
        return new Promise<boolean>(resolve => req.session.destroy(error => {
            res.clearCookie(COOKIE_NAME)
            if(error) {
                console.log(error)
                resolve(false)
                return
            }
            resolve(true)
        }))
        
    }
}