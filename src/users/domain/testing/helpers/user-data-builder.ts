import { faker } from '@faker-js/faker'
import { UserProps } from '../../entities/user.entity'

interface Props {
  name?: string
  email?: string
  password?: string
  createdAt?: Date
}

export function UserDataBuilder(props: Props): UserProps {
  return {
    email: props.email ?? faker.internet.email(),
    name: props.email ?? faker.person.fullName(),
    password: props.password ?? faker.internet.password(),
    createdAt: props.createdAt ?? new Date(),
  }
}
