import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { criaUsuarioDto } from "./dto/CriaUsuario.dto";
import { UsuarioRepository } from "./usuario.repository";

@Controller('/usuarios')
export class UsuarioController {

    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) {}

    @Post()
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
      }))
    async criaUsuario(@Body() dadosDoUsuario: criaUsuarioDto) {
        this.usuarioRepository.salvar(dadosDoUsuario);
        return dadosDoUsuario;
    }

    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listar();
    }

}