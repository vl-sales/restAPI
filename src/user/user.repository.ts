import { Injectable } from "@nestjs/common"
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private readonly users: UserEntity[] = [];

    async save(user: UserEntity) {
        this.users.push(user);
        console.log(this.users);
    }

    async findOneByEmail(email: string) {
        const possibleUser = this.users.find(
            usuario => usuario.email === email
        );

        return possibleUser !== undefined;
    }

    async list() {
        return this.users;
    }

    private async findOneById(id) {
        const user = this.users.find(user => user.id === id);

        if (!user) throw new Error('User not found');

        return user
    }

    async updateUser(id, userData: Partial<UserEntity>): Promise<UserEntity> {
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