import { UserDataBuilder } from '../../testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../user.entity'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })
  it('Constructor method email', () => {
    expect(sut.props.email).toBe(props.email)
  })
  it('Constructor method password', () => {
    expect(sut.props.password).toBe(props.password)
  })
  it('Constructor method name', () => {
    expect(sut.props.name).toBe(props.name)
  })
  it('Constructor method createdAt', () => {
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of name fields', () => {
    expect(sut.name).toBeDefined()
    expect(sut.name).toEqual(props.name)
    expect(typeof sut.password).toBe('string')
  })

  it('Getter of email field', () => {
    expect(sut.email).toBeDefined()
    expect(sut.email).toEqual(props.email)
    expect(typeof sut.email).toBe('string')
  })
  it('Getter of password field', () => {
    expect(sut.password).toBeDefined()
    expect(sut.password).toEqual(props.password)
    expect(typeof sut.email).toBe('string')
  })
  it('Getter of createdAt field', () => {
    expect(sut.createdAt).toBeDefined()
    expect(sut.createdAt).toBeInstanceOf(Date)
  })

  it('Setter of name field', () => {
    sut.update('Gustavo')

    expect(sut.props.name).toBe('Gustavo')
  })

  it('Setter of password field', () => {
    sut.updatePassword('Gustavinho123')

    expect(sut.props.password).toBe('Gustavinho123')
  })
})
