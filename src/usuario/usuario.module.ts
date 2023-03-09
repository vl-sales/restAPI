import { Module } from "@nestjs/common/decorators";
import { EmailEhUnicoValidator } from "./dto/validacao/emailEhUnico.validator";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";

@Module({
    imports: [],
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailEhUnicoValidator],
  })
  export class UsuarioModule {}