import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CriaProdutoDto } from "./dto/criaProduto.dto";
import { produtosRepository } from "./produtos.repository";

@Controller('/produtos')
export class produtosController {

  constructor(
    private readonly _produtosRepository: produtosRepository
  ){}

  @Post('/criar')
  @UsePipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  async criaProduto(
    @Body() dadosDoProduto: CriaProdutoDto
    ) {
    
    this._produtosRepository.salvar(dadosDoProduto)
    return dadosDoProduto
  }

  @Get('/listar')
  async listarProdutos(){
    const lista = await this._produtosRepository.listar()
    return lista
  }

}