import { Injectable } from "@nestjs/common"

@Injectable()
export class produtosRepository {
    private readonly produtos = []

    async salvar(dadosDoProduto) {
        this.produtos.push(dadosDoProduto)
        console.log(this.produtos)
    }

    listar() {
        return this.produtos
    }

}