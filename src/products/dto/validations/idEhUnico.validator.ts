import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { ProductRepository } from "src/products/product.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class IdEhUnicoValidator implements ValidatorConstraintInterface {
    constructor(
        private readonly _productRepository: ProductRepository
    ){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const idExiste = await this._productRepository.findOneById(value)
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