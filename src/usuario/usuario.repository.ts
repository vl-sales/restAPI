import { Injectable } from "@nestjs/common"
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private readonly users: UsuarioEntity[] = [];

    async salvar(user: UsuarioEntity) {
        this.users.push(user);
        console.log(this.users);
    }

    async findOneByEmail(email: string) {
        const possivelUsuario = this.users.find(
            usuario => usuario.email === email
        );

        return possivelUsuario !== undefined;
    }

    async listar() {
        return this.users;
    }

    private async findOneById(id) {
        const user = this.users.find(user => user.id === id);

        if (!user) throw new Error('User not found');

        return user
    }

    async updateUser(id, userData: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
        const user = await this.findOneById(id)

        Object.entries(userData).forEach(([chave, valor]) => {
            if(chave === 'id') {
                return;
            }

            if (valor) {
                user[chave] = valor;
            }
        })

        return user
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.findOneById(id);
        const userIndex = this.users.findIndex((savedUser) => savedUser === user);

        this.users.splice(userIndex, 1);
    }
}