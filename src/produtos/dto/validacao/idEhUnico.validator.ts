import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { produtosRepository } from "src/produtos/produtos.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class IdEhUnicoValidator implements ValidatorConstraintInterface {
    constructor(
        private readonly _produtoRepository: produtosRepository
    ){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const idExiste = await this._produtoRepository.findOneById(value)
        return !idExiste
    }
}

export const idEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: IdEhUnicoValidator
        })
    }
}