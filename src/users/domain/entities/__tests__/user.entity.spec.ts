import { UserEntity, UserProps } from '../user.entity'
import { faker } from '@faker-js/faker'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
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
})
