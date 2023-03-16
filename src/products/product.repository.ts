import { Injectable } from "@nestjs/common"
import { UpdateProductDTO } from "./dto/updateProduct.dto"
import { ProductEntity } from "./entities/product.entity"

@Injectable()
export class ProductRepository {
    private readonly products: ProductEntity[] = []

    async salvar(dadosDoProduto) {
        this.products.push(dadosDoProduto)
        console.log(this.products)
    }

    listar() {
        return this.products
    }

    async findOneById(id: number) {
        const product = this.products.find(product => product.productIdForUser === id)

        return product
    }

    
    async findOneByProductId(id) {
        return this.products.find(product => product.id === id.id)
    }


    async updateProduct(productData:Partial<ProductEntity>, id: string) {
        const product = await this.findOneByProductId(id)
        Object.entries(productData).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            product[chave] = valor

        })

        return product
    }

    async deleteProduct(id: string): Promise<ProductEntity> {
        const product = await this.findOneByProductId(id);
        const productIndex = this.products.findIndex((savedProduct) => savedProduct === product);

        this.products.splice(productIndex, 1);

        return product
    }

}