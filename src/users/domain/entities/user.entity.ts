import { Entity } from '@/shared/domain/entites/entity'
import { UserValidatorFactory } from '../validators/user.validator'

export type UserProps = {
  name: string
  email: string
  password: string
  createdAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
  }

  updatePassword(password: string) {
    UserEntity.validate({ ...this.props, password: password })
    this.password = password
  }
  update(name: string) {
    UserEntity.validate({ ...this.props, name: name })
    this.name = name
  }

  get name() {
    return this.props.name
  }

  private set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }
  private set password(password: string) {
    this.props.password = password
  }

  get createdAt() {
    return this.props.createdAt
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create()
    validator.validate(props)
  }
}
