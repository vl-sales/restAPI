import { Module } from "@nestjs/common";
import { IdEhUnicoValidator } from "./dto/validacao/idEhUnico.validator";
import { produtosController } from "./produtos.controller";
import { produtosRepository } from "./produtos.repository";


@Module({
    imports: [],
    controllers: [produtosController],
    providers: [produtosRepository, IdEhUnicoValidator],
  })
export class produtosModule {}