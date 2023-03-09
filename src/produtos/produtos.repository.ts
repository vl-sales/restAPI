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

    async findOneById(id: number) {
        return this.produtos.find(produto => {
            if (produto.id === id) return produto
        })
    }

}