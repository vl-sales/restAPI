import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from "../dto/criaProduto.dto";

export class ProductEntity {
    id: string;
    productIdForUser: number;
    nome: string;
    valor: number;
    quantidadeDisponivel: number;
    descricao: string;
    caracteristicas: CaracteristicaProdutoDTO[];
    imagens: ImagemProdutoDTO[];
    categoria: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
}