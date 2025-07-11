import * as libClassValidator from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubValidatorFields extends ClassValidatorFields<{
  field: string
}> {}
describe('Class validator fields unit test', () => {
  it('Should initialize Erros and ValidatedData variabels with null', () => {
    const sut = new StubValidatorFields()

    expect(sut.errors).toBeNull()
    expect(sut.validateData).toBeNull()
  })

  it('Should validate with errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')

    //Aqui ele basicamente faz o retorno de quando chamarmos a função validateSync

    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isRequired: 'test error' } },
    ])

    const sut = new StubValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validateData).toBeNull()
    expect(sut.errors).toStrictEqual({ field: ['test error'] })
  })

  it('Should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')

    //Aqui ele basicamente faz o retorno de quando chamarmos a função validateSync

    spyValidateSync.mockReturnValue([])

    const sut = new StubValidatorFields()

    //Lembrando que quando não há erro, o validate retorna true e o validateDate retorna exatamente os campos que foram passados

    expect(sut.validate({ field: 'value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validateData).toStrictEqual({ field: 'value' })
    expect(sut.errors).toBeNull()
  })
})
