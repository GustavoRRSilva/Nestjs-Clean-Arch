import { UserProps } from '@/users/domain/entities/user.entity'
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

let sut: UserValidator
let props: UserProps
describe('Class validator fields integration test', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
    props = UserDataBuilder({})
  })
  it('Invalide cases for name field', () => {
    let validated = sut.validate(null as any)

    expect(validated).toBeFalsy()
    expect(sut.validateData).toBeNull()
    expect(sut.errors).toStrictEqual({
      name: [
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
        'name should not be empty',
      ],
      email: [
        'email must be shorter than or equal to 255 characters',
        'email must be a string',
        'email should not be empty',
        'email must be an email',
      ],
      password: [
        'password must be a string',
        'password must be shorter than or equal to 255 characters',
        'password should not be empty',
        'password must be longer than or equal to 8 characters',
      ],
    })

    expect(sut.validate({ ...props, name: '' })).toBeFalsy()
    expect(sut.errors).toStrictEqual({ name: ['name should not be empty'] })

    expect(sut.validate({ ...props, name: 10 as any })).toBeFalsy()
    expect(sut.errors).toStrictEqual({
      name: [
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
    })

    expect(sut.validate({ ...props, name: 'a'.repeat(256) as any })).toBeFalsy()
    expect(sut.errors).toStrictEqual({
      name: ['name must be shorter than or equal to 255 characters'],
    })
  })
  it('Valid case for return', () => {
    let isvalid = sut.validate({ ...props })

    expect(isvalid).toBeTruthy()
    expect(sut.errors).toBeNull()
    expect(sut.validateData).toStrictEqual(new UserRules(props))
  })
})
