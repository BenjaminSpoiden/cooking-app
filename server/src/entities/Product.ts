import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Product extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => String)
    @Column()
    productName: string

    @Field(() => String)
    @Column()
    produceDesc: string

    @Field(() => Float)
    @Column()
    productPrice: number

    @Field(() => String)
    @Column()
    productImage: string

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date
    
    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date

}