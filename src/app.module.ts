import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/infrastructure/users.module'

@Module({
  imports: [EnvConfigModule, ConfigModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
