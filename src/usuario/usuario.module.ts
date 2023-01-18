import { Module } from "@nestjs/common/decorators";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";

@Module({
    imports: [],
    controllers: [UsuarioController],
    providers: [UsuarioRepository],
  })
  export class UsuarioModule {}