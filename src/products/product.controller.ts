import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CriaProdutoDto } from "./dto/criaProduto.dto";
import { ProductRepository } from "./product.repository";
import {v4 as uuid} from 'uuid'
import { ProductEntity } from "./entities/product.entity";
import { UpdateProductDTO } from "./dto/updateProduct.dto";

@Controller('/produtos')
export class produtosController {

  constructor(
    private readonly _productRepository: ProductRepository
  ){}

  @Post('criar')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  async criaProduto(
    @Body() productData: CriaProdutoDto
    ) {
    const userDataWithId: ProductEntity = {
      id: uuid(),
      ...productData
    }

    this._productRepository.salvar(userDataWithId)
    return productData
  }

  @Get('listar')
  async listarProdutos(){
    const lista = await this._productRepository.listar()
    return lista
  }

  @Put('update/:id')
  async updateProduct(
    @Param() id: string,
    @Body() productData: UpdateProductDTO
  ) {
    
    try {
      const updatedProduct = this._productRepository.updateProduct(productData, id)
      return updatedProduct
    
    } catch (error) {
      console.error(error)  
    }
  }

  @Delete('delete/:id')
  async deleteUser(
    @Param() id: string
  ) {
    try {
      const deletedProduct = this._productRepository.deleteProduct(id)
      return deletedProduct
    } catch (error) {
      console.error(error)
    }
  }
}