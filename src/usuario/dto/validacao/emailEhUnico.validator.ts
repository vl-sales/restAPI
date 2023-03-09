import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "src/usuario/usuario.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ) {}
    
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioExiste = await this.usuarioRepository.findOneByEmail(value)
        return !usuarioExiste
    }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        })
    }
}