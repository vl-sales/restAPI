import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "src/user/user.repository";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
    constructor(
        private readonly _userRepository: UserRepository
    ) {}
    
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioExists = await this._userRepository.findOneByEmail(value)
        return !usuarioExists
    }
}

export const uniqueEmail = (validationOptions: ValidationOptions) => {
    return (object: Object, properties: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: properties,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator
        })
    }
}