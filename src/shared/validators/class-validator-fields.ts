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
      for (const error of errors) {
        const field = error.property

        this.errors[field] = Object.values(error)
      }
    } else {
      this.validateData = data
    }
    return !errors.length
  }
}
