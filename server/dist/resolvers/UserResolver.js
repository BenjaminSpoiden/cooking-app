"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const CustomError_1 = require("../errors/CustomError");
const constants_1 = require("../constants");
const sendEmail_1 = require("../utils/sendEmail");
const ModuleBinder_1 = __importDefault(require("../utils/ModuleBinder"));
let RegisterUserInput = class RegisterUserInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterUserInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterUserInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RegisterUserInput.prototype, "email", void 0);
RegisterUserInput = __decorate([
    type_graphql_1.InputType()
], RegisterUserInput);
let LoginUserInput = class LoginUserInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginUserInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginUserInput.prototype, "password", void 0);
LoginUserInput = __decorate([
    type_graphql_1.InputType()
], LoginUserInput);
let UserReponse = class UserReponse {
};
__decorate([
    type_graphql_1.Field(() => [CustomError_1.FieldErrors], { nullable: true }),
    __metadata("design:type", Array)
], UserReponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserReponse.prototype, "user", void 0);
UserReponse = __decorate([
    type_graphql_1.ObjectType()
], UserReponse);
let UserResolver = class UserResolver {
    async changePassword(token, newPassword, { req }) {
        if (newPassword.length < 8) {
            return {
                errors: [
                    {
                        field: "resetPassword",
                        message: "The password must be atleast 8 characters."
                    }
                ]
            };
        }
        const key = constants_1.FORGET_PASSWORD_PREFIX + token;
        const userID = await ModuleBinder_1.default.get(key);
        if (!userID) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "Token expired"
                    }
                ]
            };
        }
        const currentUser = await User_1.User.findOne({ id: parseInt(userID) });
        if (!currentUser) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "User no longer exists"
                    }
                ]
            };
        }
        currentUser.password = await argon2_1.default.hash(newPassword);
        await currentUser.save();
        await ModuleBinder_1.default.del(key);
        req.session.userId = currentUser.id;
        return {
            user: currentUser
        };
    }
    async forgotPassword(email, {}) {
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return false;
        }
        const token = user.uuid;
        await ModuleBinder_1.default.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 180);
        await sendEmail_1.sendEmail(email, `<a href="http://localhost:3000/change-password/${token}" >Reset Password</a>`);
        return true;
    }
    async getAllUsers() {
        return await User_1.User.find();
    }
    async getUser(id) {
        return await User_1.User.findOne({ id });
    }
    async deleteUser(id) {
        try {
            await User_1.User.delete({ id });
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    async registerUser(userCreds, { req }) {
        if (userCreds.username.length <= 3) {
            return {
                errors: [{
                        field: 'username',
                        message: "The username must be atleast 3 characters"
                    }]
            };
        }
        if (userCreds.password.length < 8) {
            return {
                errors: [{
                        field: 'password',
                        message: "The password must be atleast 8 characters"
                    }]
            };
        }
        const hashedPassword = await argon2_1.default.hash(userCreds.password);
        let user = undefined;
        try {
            const registeredUser = await User_1.User
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values({
                username: userCreds.username,
                password: hashedPassword,
                email: userCreds.email
            })
                .returning('*')
                .updateEntity(true)
                .execute();
            user = registeredUser.generatedMaps[0];
        }
        catch (error) {
            if (error.routine === '_bt_check_unique') {
                return {
                    errors: [{
                            field: "username",
                            message: "The user already exist"
                        }]
                };
            }
        }
        req.session.userId = user === null || user === void 0 ? void 0 : user.id;
        return {
            user: user
        };
    }
    async loginUser(userCreds, { req }) {
        const user = await User_1.User.findOne({ username: userCreds.username.toLowerCase() });
        if (!user) {
            return {
                errors: [{
                        field: 'username',
                        message: "The username doesn't exist"
                    }]
            };
        }
        const validPassword = await argon2_1.default.verify(user.password, userCreds.password);
        if (!validPassword) {
            return {
                errors: [{
                        field: 'password',
                        message: "The passwords did not match"
                    }]
            };
        }
        else {
            req.session.userId = user.id;
            return {
                user
            };
        }
    }
    async currentUser({ req }) {
        if (!req.session.userId) {
            return null;
        }
        const user = await User_1.User.findOne({ id: req.session.userId });
        return user;
    }
    logoutUser({ req, res }) {
        return new Promise(resolve => req.session.destroy(error => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (error) {
                console.log(error);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
};
__decorate([
    type_graphql_1.Mutation(() => UserReponse),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Arg("newPassword")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    type_graphql_1.Query(() => User_1.User),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    type_graphql_1.Mutation(() => UserReponse),
    __param(0, type_graphql_1.Arg("userCreds")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "registerUser", null);
__decorate([
    type_graphql_1.Mutation(() => UserReponse),
    __param(0, type_graphql_1.Arg("userCreds")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "currentUser", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logoutUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map