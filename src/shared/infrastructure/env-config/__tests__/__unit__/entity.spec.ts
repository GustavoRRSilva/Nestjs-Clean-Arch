import { Entity } from '@/shared/domain/entites/entity'
import { beforeEach } from 'node:test'
import { validate } from 'uuid'

type StubProps = {
  props1: string
  props2: number
}

class StubEntity extends Entity {}

describe('Entity tests', () => {
  it('should set props and id', () => {
    const props = {
      props1: 'gustavo',
      props2: 24,
    }
    const entity = new StubEntity(props)
    expect(entity.props).toStrictEqual(props)
    expect(entity.id).not.toBeNull()
    expect(validate(entity.id)).toBeTruthy()
  })

  it('should jsonReturns', () => {
    const props: StubProps = {
      props1: 'Gustavo',
      props2: 22,
    }

    const id = '3c2f4def-8106-4a2f-9a72-a41c17f40eb9'

    const entity = new StubEntity(props, id)
    const allprops = {
      id,
      ...props,
    }

    expect(entity.toJson()).toStrictEqual(allprops)
  })
})
