import { validateSync } from 'class-validator'
import {
  FieldsError,
  ValidateFieldsInterface,
} from './validator-fields.inteface'

export abstract class ClassValidatorFields<PropsValidate>
  implements ValidateFieldsInterface<PropsValidate>
{
  errors: FieldsError = null
  validateData: PropsValidate = null

  validate(data: any): boolean {
    const errors = validateSync(data)
    if (errors.length) {
      //Prepara o objeto para armazenar os erros encontrados
      this.errors = {}
      for (const error of errors) {
        const field = error.property
        this.errors[field] = Object.values(error.constraints)
      }
    } else {
      this.validateData = data
    }
    return !errors.length
  }
}
