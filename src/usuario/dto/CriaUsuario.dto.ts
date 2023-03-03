import { IsEmail, MinLength, IsNotEmpty} from "class-validator";

export class criaUsuarioDto {

    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    nome: string;
    
    @IsEmail(undefined, { message: 'O Email informado é inválido' })
    email: string;
    
    @MinLength(6, { message: 'A senha deve ter ao menos 6 caracteres' })
    senha: string;
}