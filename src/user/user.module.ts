import { Module } from "@nestjs/common/decorators";
import { UniqueEmailValidator } from "./dto/validation/uniqueEmail.validator";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserRepository, UniqueEmailValidator],
  })
  export class UsuarioModule {}