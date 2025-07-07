import { ClassValidatorFields } from '@/shared/validators/class-validator-fields'
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'
import { UserProps } from '../entities/user.entity'

export class UserRules {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  name: string

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  email: string

  @MinLength(8)
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  password: string

  @IsDate()
  @IsOptional()
  createdAt: Date

  constructor({ name, email, password, createdAt }: UserProps) {
    Object.assign(this, { name, email, password, createdAt })
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}
