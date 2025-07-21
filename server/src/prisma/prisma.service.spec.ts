import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from './prisma.service'

describe('PrismaService', () => {
  let service: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile()

    service = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should connect to database on module init', async () => {
    const connectSpy = jest.spyOn(service, '$connect')
    await service.onModuleInit()
    expect(connectSpy).toHaveBeenCalled()
  })

  it('should disconnect from database on module destroy', async () => {
    const disconnectSpy = jest.spyOn(service, '$disconnect')
    await service.onModuleDestroy()
    expect(disconnectSpy).toHaveBeenCalled()
  })
})
