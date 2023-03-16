import { Body, Controller, Param, Get, Post, Put, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";
import {v4 as uuid} from 'uuid'
import { ListUserDTO } from "./dto/listUsers.dto";
import { UpdateUserDTO } from "./dto/UpdateUser";
@Controller('/usuarios')
export class UserController {

    constructor(
        private readonly _userRepository: UserRepository
    ) {}

    @Post()
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
      }))
    async createUser(@Body() userData: CreateUserDTO) {
        const usuarioEntitiy = new UserEntity();
        usuarioEntitiy.email = userData.email;
        usuarioEntitiy.password = userData.password;
        usuarioEntitiy.name = userData.name;
        usuarioEntitiy.id = uuid();

        this._userRepository.save(usuarioEntitiy);
        
        return {
            id: new ListUserDTO(usuarioEntitiy.id, usuarioEntitiy.name),
            message: 'usuário criado com sucesso'
        };
    }

    @Get()
    async listUsers() {
        const savedUsers = await this._userRepository.list();
        const usersList = savedUsers.map(user => new ListUserDTO(user.id, user.name))
        return usersList
    }

    @Put("/:id")
    async updateUser(
        @Param('id') id: string,
        @Body() dadosDoUsuario: UpdateUserDTO
    ) {
        try {
            const updatedUser = await this._userRepository.updateUser(id, dadosDoUsuario)
            return {
                usuario: updatedUser,
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
            await this._userRepository.deleteUser(id)
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