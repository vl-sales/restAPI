import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, ValidateNested } from "class-validator";
import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from "./criaProduto.dto";

export class UpdateProductDTO {
    @IsString()
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    @IsOptional()
    nome: string;
    
    @IsPositive({message: 'Valor precisa ser um valor positivo'})
    @IsNumber({ maxDecimalPlaces: 2 }, {message: 'Valor pode ter atée duas casas decimais'})
    @IsOptional()
    valor: number;

    @Min(0, {message: 'Quantidade não pode ser menor que zero'})
    @IsOptional()
    quantidadeDisponivel: number;

    @IsNotEmpty({message: 'Descrição não pode ser vazia'})
    @MaxLength(1000, {message: 'Máximo 1000 caracteres na descrição'})
    @IsOptional()
    descricao: string;
    
    @ValidateNested()
    @IsArray({message: 'Características deve ser um array'})
    @ArrayMinSize(3, {message: 'São necessárias 3 características do produto'})
    @Type(() => CaracteristicaProdutoDTO)
    @IsOptional()
    caracteristicas: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray({message: 'Características deve ser um array'})
    @ArrayMinSize(1, {message: 'É necessário ter no mínimo 1 foto'})
    @Type(() => ImagemProdutoDTO)
    @IsOptional()
    imagens: ImagemProdutoDTO[];

    @IsNotEmpty({message: 'Categoria não pode ser vazia'})
    @IsOptional()
    categoria: string;
    
    @IsDateString()
    @IsOptional()
    dataCriacao: Date;

    @IsDateString()
    @IsOptional()
    dataAtualizacao: Date;
}