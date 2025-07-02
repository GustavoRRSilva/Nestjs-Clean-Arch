export type FieldsError = {
  [fields: string]: string[]
}

export interface ValidateFieldsInterface<PropsValidate> {
  //errors que pode retornar
  errors: FieldsError

  //Dados a serem validados
  validateData: PropsValidate

  //validação dos dados para verificar se estão validados ou nãos
  validate(data: any): boolean
}
