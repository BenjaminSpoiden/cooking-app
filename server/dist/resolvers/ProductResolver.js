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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const Product_1 = require("../entities/Product");
const CustomError_1 = require("../errors/CustomError");
const type_graphql_1 = require("type-graphql");
let ProductInput = class ProductInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ProductInput.prototype, "productName", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ProductInput.prototype, "produceDesc", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], ProductInput.prototype, "productPrice", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ProductInput.prototype, "productImage", void 0);
ProductInput = __decorate([
    type_graphql_1.InputType()
], ProductInput);
let ProductResponse = class ProductResponse {
};
__decorate([
    type_graphql_1.Field(() => [CustomError_1.FieldErrors], { nullable: true }),
    __metadata("design:type", Array)
], ProductResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Product_1.Product, { nullable: true }),
    __metadata("design:type", Product_1.Product)
], ProductResponse.prototype, "product", void 0);
ProductResponse = __decorate([
    type_graphql_1.ObjectType()
], ProductResponse);
let ProductResolver = class ProductResolver {
    async getAllProducts() {
        return await Product_1.Product.find();
    }
    async getProduct(id) {
        const product = await Product_1.Product.findOne({ id });
        if (!product) {
            return {
                errors: [{
                        field: "Product",
                        message: "This product doesn't exist"
                    }]
            };
        }
        else {
            return {
                product
            };
        }
    }
    async addProduct(productInput) {
        let newProduct = undefined;
        try {
            const product = await Product_1.Product
                .createQueryBuilder()
                .insert()
                .into(Product_1.Product)
                .values({
                productName: productInput.productName,
                produceDesc: productInput.produceDesc,
                productImage: productInput.productImage,
                productPrice: productInput.productPrice
            })
                .returning("*")
                .updateEntity(true)
                .execute();
            newProduct = product.generatedMaps[0];
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
        return {
            product: newProduct
        };
    }
};
__decorate([
    type_graphql_1.Query(() => [Product_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getAllProducts", null);
__decorate([
    type_graphql_1.Query(() => ProductResponse),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProduct", null);
__decorate([
    type_graphql_1.Mutation(() => ProductResponse),
    __param(0, type_graphql_1.Arg("productInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "addProduct", null);
ProductResolver = __decorate([
    type_graphql_1.Resolver()
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=ProductResolver.js.map