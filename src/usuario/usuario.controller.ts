import { Body, Controller, Param, Get, Post, Put, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { CriaUsuarioDto } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioRepository } from "./usuario.repository";
import {v4 as uuid} from 'uuid'
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { AtualizaUsuarioDto } from "./dto/atualizaUsuario.dto";
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
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
        const usuarioEntitiy = new UsuarioEntity();
        usuarioEntitiy.email = dadosDoUsuario.email;
        usuarioEntitiy.senha = dadosDoUsuario.senha;
        usuarioEntitiy.nome = dadosDoUsuario.nome;
        usuarioEntitiy.id = uuid();

        this.usuarioRepository.salvar(usuarioEntitiy);
        
        return {
            id: new ListaUsuarioDTO(usuarioEntitiy.id, usuarioEntitiy.nome),
            message: 'usuário criado com sucesso'
        };
    }

    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar();
        const usuariosLista = usuariosSalvos.map(user => new ListaUsuarioDTO(user.id, user.nome))
        return usuariosLista
    }

    @Put("/:id")
    async atualizaUsuario(
        @Param('id') id: string,
        @Body() dadosDoUsuario: AtualizaUsuarioDto
    ) {
        try {
            const usuarioAtualizado = await this.usuarioRepository.updateUser(id, dadosDoUsuario)
            return {
                usuario: usuarioAtualizado,
                message: 'Usuário atualizado com sucesso'
            }
        } catch (error) {
            return {
                message: error
            }
        }
    }

    @Delete('/remove/:id')
    async removeUser(
        @Param('id') id: string
    ) {
        try {
            await this.usuarioRepository.deleteUser(id)
            return {
                message: 'usuário deletado'
            }
        } catch (error) {
            return {
                message: error
            }
        }
    }

}