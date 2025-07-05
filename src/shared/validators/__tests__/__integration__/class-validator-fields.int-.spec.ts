import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidator extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('Class validator fields integration test', () => {
  it('Should initialize Erros and ValidatedData variabels with null', () => {
    const sut = new StubClassValidator()

    expect(sut.errors).toBeNull()
    expect(sut.validateData).toBeNull()
  })

  it('Should return with errors', () => {
    const sut = new StubClassValidator()

    expect(sut.validate(null)).toBeFalsy()
    expect(sut.errors).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints',
      ],
    })
    expect(sut.validateData).toBeNull()
  })

  it('Should return with sucess', () => {
    const sut = new StubClassValidator()

    expect(sut.validate({ name: 'Gustavo', price: 255 })).toBeTruthy()
    expect(sut.validateData).toStrictEqual(
      new StubRules({ name: 'Gustavo', price: 255 }),
    )
    expect(sut.errors).toBeNull()
  })
})
