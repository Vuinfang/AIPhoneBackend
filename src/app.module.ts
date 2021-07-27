import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { ResultModule } from './core/result/result.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ApiConfigService, SharedModule } from './shared';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './core/admin/admin.module';
import { PhoneModule } from './features/phone/phone.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfig,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UserModule,
    AuthModule,
    ResultModule,
    SharedModule,
    AdminModule,
    PhoneModule,
  ],
})
export class AppModule {}
