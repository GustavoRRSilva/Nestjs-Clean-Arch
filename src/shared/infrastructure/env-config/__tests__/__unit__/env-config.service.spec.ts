import { Test, TestingModule } from '@nestjs/testing'
import { EnvConfigService } from '../../env-config.service'
import { EnvConfigModule } from '../../env-config.module'

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()], //add
      providers: [EnvConfigService],
    }).compile()

    sut = module.get<EnvConfigService>(EnvConfigService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('shoud be get AppPort', () => {
    const getAppPort = sut.getAppPort()

    expect(getAppPort).toBe('3000')
  })

  it('shoud be get NODE_ENV', () => {
    const getNodeEnv = sut.getNodeEnv()

    expect(getNodeEnv).toBe('test')
  })
})
