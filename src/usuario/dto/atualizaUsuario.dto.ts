import { IsEmail, MinLength, IsNotEmpty, IsOptional} from "class-validator";
import { EmailEhUnico } from "./validacao/emailEhUnico.validator";

export class AtualizaUsuarioDto {

    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @IsOptional()
    nome: string;
    
    @IsEmail(undefined, { message: 'O Email informado é inválido' })
    @EmailEhUnico({ message: 'Já existe usuário com esse e-mail' })
    @IsOptional()
    email: string;
    
    @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres' })
    @IsOptional()
    senha: string;
}