import { Module } from "@nestjs/common";
import { IdEhUnicoValidator } from "./dto/validations/idEhUnico.validator";
import { produtosController } from "./product.controller";
import { ProductRepository } from "./product.repository";


@Module({
    imports: [],
    controllers: [produtosController],
    providers: [ProductRepository, IdEhUnicoValidator],
  })
export class ProductModule {}