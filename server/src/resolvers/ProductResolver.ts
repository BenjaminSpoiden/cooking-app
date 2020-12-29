import { Product } from "../entities/Product";
import { FieldErrors } from "../errors/CustomError";
import { Arg, Field, Float, InputType, Int, Mutation, ObjectType, Query, Resolver } from "type-graphql";


@InputType()
class ProductInput {
    @Field(() => String)
   
    productName: string

    @Field(() => String)
   
    produceDesc: string

    @Field(() => Float)
  
    productPrice: number

    @Field(() => String)
    productImage: string
}

@ObjectType()
class ProductResponse {

    @Field(() => [FieldErrors], { nullable: true })
    errors?: FieldErrors[]

    @Field(() => Product, { nullable: true })
    product?: Product
}

@Resolver()
export class ProductResolver {

    @Query(() => [Product])
    async getAllProducts(): Promise<Product[]> {
        return await Product.find()
    }

    @Query(() => ProductResponse)
    async getProduct(
        @Arg("id", () => Int)
        id: number
    ): Promise<ProductResponse> {
        const product = await Product.findOne({ id })
        if(!product) {
            return {
                errors: [{
                    field: "Product",
                    message: "This product doesn't exist"
                }]
            }
        }else {
            return {
                product
            }
        }
    }

    @Mutation(() => ProductResponse)
    async addProduct(
        @Arg("productInput")
        productInput: ProductInput
    ): Promise<ProductResponse> {

        let newProduct = undefined

        try {
            const product = await Product
                .createQueryBuilder()
                .insert()
                .into(Product)
                .values({
                    productName: productInput.productName,
                    produceDesc: productInput.produceDesc,
                    productImage: productInput.productImage,
                    productPrice: productInput.productPrice
                })
                .returning("*")
                .updateEntity(true)
                .execute()
            
            newProduct = product.generatedMaps[0] as Product
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

        return {
            product: newProduct
        }
    }

}