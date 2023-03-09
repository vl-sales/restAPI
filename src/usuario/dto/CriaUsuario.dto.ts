import { IsEmail, MinLength, IsNotEmpty} from "class-validator";
import { EmailEhUnico } from "./validacao/emailEhUnico.validator";

export class criaUsuarioDto {

    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    nome: string;
    
    @IsEmail(undefined, { message: 'O Email informado é inválido' })
    @EmailEhUnico({ message: 'Já existe usuário com esse e-mail' })
    email: string;
    
    @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres' })
    senha: string;
}