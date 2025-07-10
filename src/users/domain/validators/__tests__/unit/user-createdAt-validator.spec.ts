import { UserProps } from '@/users/domain/entities/user.entity'
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

let sut: UserValidator
let props: UserProps
describe('tests for user Da validator', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
    props = UserDataBuilder({})
  })

  describe('error when all props are null', () => {
    it('expect all atributes return all errors', () => {
      let validate = sut.validate(null)

      expect(validate).toBeFalsy()
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
    })
    it('expect return when pass a different type of date', () => {
      let validate = sut.validate({ ...props, createdAt: 10 as any })
      expect(validate).toBeFalsy()
      expect(sut.validateData).toBeNull()
      expect(sut.errors).toStrictEqual({
        createdAt: ['createdAt must be a Date instance'],
      })
    })
    it('expect return when pass a correct data', () => {
      let date = new Date()
      let validate = sut.validate({ ...props, createdAt: date })
      expect(validate).toBeTruthy()
      expect(sut.errors).toBeNull()
      expect(sut.validateData).toStrictEqual(new UserRules({ ...props }))
    })
  })
})
