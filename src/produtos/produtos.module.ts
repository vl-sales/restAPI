import { Module } from "@nestjs/common";
import { produtosController } from "./produtos.controller";
import { produtosRepository } from "./produtos.repository";


@Module({
    imports: [],
    controllers: [produtosController],
    providers: [produtosRepository],
  })
export class produtosModule {}