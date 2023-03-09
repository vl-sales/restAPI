import { Injectable } from "@nestjs/common"

@Injectable()
export class UsuarioRepository {
    private readonly usuarios = [];

    async salvar(usuario) {
        this.usuarios.push(usuario);
        console.log(this.usuarios);
    }

    async findOneByEmail(email: string) {
        const possivelUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }

    async listar() {
        return this.usuarios;
    }
}