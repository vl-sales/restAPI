import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min, ValidateNested } from "class-validator";
import { idEhUnico } from "./validations/idEhUnico.validator";

export abstract class CaracteristicaProdutoDTO {
    @IsString()
    nome: string;
    @IsString()
    descricao: string;
}

export abstract class ImagemProdutoDTO {
    @IsString()
    url: string;
    @IsString()
    descricao: string;
}

export class CriaProdutoDto {
    @IsNumber()
    @IsNotEmpty()
    @idEhUnico({ message: 'Já existe produto com esse id' })
    productIdForUser: number;

    @IsString()
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    nome: string;
    
    @IsPositive({message: 'Valor precisa ser um valor positivo'})
    @IsNumber({ maxDecimalPlaces: 2 }, {message: 'Valor pode ter atée duas casas decimais'})
    valor: number;

    @Min(0, {message: 'Quantidade não pode ser menor que zero'})
    quantidadeDisponivel: number;

    @IsNotEmpty({message: 'Descrição não pode ser vazia'})
    @MaxLength(1000, {message: 'Máximo 1000 caracteres na descrição'})
    descricao: string;
    
    @ValidateNested()
    @IsArray({message: 'Características deve ser um array'})
    @ArrayMinSize(3, {message: 'São necessárias 3 características do produto'})
    @Type(() => CaracteristicaProdutoDTO)
    caracteristicas: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray({message: 'Características deve ser um array'})
    @ArrayMinSize(1, {message: 'É necessário ter no mínimo 1 foto'})
    @Type(() => ImagemProdutoDTO)
    imagens: ImagemProdutoDTO[];

    @IsNotEmpty({message: 'Categoria não pode ser vazia'})
    categoria: string;
    
    @IsDateString()
    dataCriacao: Date;

    @IsDateString()
    dataAtualizacao: Date;
}