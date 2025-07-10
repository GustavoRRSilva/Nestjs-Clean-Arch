import { UserProps } from '@/users/domain/entities/user.entity'
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

let sut: UserValidator
let props: UserProps

describe('User email validation tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
    props = UserDataBuilder({})
  })
  it('should return error for all camps wrong', () => {
    let validate = sut.validate(null)
    expect(validate).toBeFalsy()
    expect(sut.validateData).toBeNull
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
  })
  it('should return error for type ', () => {
    let validate = sut.validate({ ...props, email: 10 as any })
    expect(validate).toBeFalsy()
    console.log(sut.errors)
    expect(sut.errors).toStrictEqual({
      email: [
        'email must be shorter than or equal to 255 characters',
        'email must be a string',
        'email must be an email',
      ],
    })
  })
  it('should return error for email ', () => {
    let validate = sut.validate({ ...props, email: 'test' as any })
    expect(validate).toBeFalsy()
    expect(sut.errors).toStrictEqual({
      email: ['email must be an email'],
    })
  })
  it('should return error for lenght bigger than 255 ', () => {
    let validate = sut.validate({
      ...props,
      email: `${'a'.repeat(255)}@gmail.com`,
    })
    expect(validate).toBeFalsy()
    expect(sut.errors).toStrictEqual({
      email: [
        'email must be shorter than or equal to 255 characters',
        'email must be an email',
      ],
    })
  })
  it('should return with sucess', () => {
    let validate = sut.validate({
      ...props,
    })
    expect(validate).toBeTruthy()
    expect(sut.errors).toBeNull()
    expect(sut.validateData).toStrictEqual(new UserRules(props))
  })
})
