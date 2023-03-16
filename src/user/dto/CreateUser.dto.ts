import { IsEmail, MinLength, IsNotEmpty} from "class-validator";
import { uniqueEmail } from "./validation/uniqueEmail.validator";

export class CreateUserDTO {

    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    name: string;
    
    @IsEmail(undefined, { message: 'O Email informado é inválido' })
    @uniqueEmail({ message: 'Já existe usuário com esse e-mail' })
    email: string;
    
    @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres' })
    password: string;
}