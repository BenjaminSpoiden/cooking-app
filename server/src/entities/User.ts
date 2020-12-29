import { Field, Float, Int, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, Generated } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => String)
    @Column()
    @Generated("uuid")
    uuid!: string

    @Field(() => String)
    @Column({ unique: true })
    username: string
    
    @Column()
    password: string

    @Field(() => String)
    @Column()
    email: string

    @Field(() => Boolean)
    @Column({ default: false })
    isConnected: boolean

    @Field(() => String)
    @Column({ nullable: true })
    gender?: string

    @Field(() => String)
    @Column({ nullable: true })
    profilePic?: string

    @Field(() => Float)
    @Column({ nullable: true })
    bmi?: number

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date
}