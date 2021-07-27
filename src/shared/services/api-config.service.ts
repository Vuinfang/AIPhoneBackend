import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { UserSubscriber } from '../../common/entity-subscribers/user-subscriber';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  private getNumber(key: string, defaultValue?: number): number {
    const value = this.configService.get(key, defaultValue);
    if (value === undefined) {
      throw new Error(key + ' env var not set'); // probably we should call process.exit() too to avoid locking the service
    }
    try {
      return Number(value);
    } catch {
      throw new Error(key + ' env var is not a number');
    }
  }

  private getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = this.configService.get(key, defaultValue?.toString());
    if (value === undefined) {
      throw new Error(key + ' env var not set');
    }
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);

    if (!value) {
      console.warn(`"${key}" environment variable is not set`);
      return;
    }
    return value.toString().replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV', 'development');
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE').toLowerCase();
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    if (this.isDevelopment) {
      return {
        entities: [
          __dirname + '/../../core/**/*.entity{.ts,.js}',
          __dirname + '/../../features/**/*.entity{.ts,.js}',
        ],
        type: 'mysql',
        host: this.getString('DB_HOST'),
        port: this.getNumber('DB_PORT'),
        username: this.getString('DB_USERNAME'),
        password: this.getString('DB_PASSWORD'),
        database: this.getString('DB_DATABASE'),
        subscribers: [UserSubscriber],
        logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
      };
    } else if (this.isProduction) {
      return {
        entities: [
          __dirname + '/../../core/**/*.entity{.ts,.js}',
          __dirname + '/../../features/**/*.entity{.ts,.js}',
        ],
        type: 'mysql',
        host: this.getString('SERVER_DB_HOST'),
        port: this.getNumber('SERVER_DB_PORT'),
        username: this.getString('SERVER_DB_USERNAME'),
        password: this.getString('SERVER_DB_PASSWORD'),
        database: this.getString('SERVER_DB_DATABASE'),
        subscribers: [UserSubscriber],
        logging: this.getBoolean('ENABLE_ORMLOGS', this.isDevelopment),
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: false,
      };
    }
  }

  get awsS3Config() {
    return {
      bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
      bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
      bucketName: this.getString('AWS_S3_BUCKET_NAME'),
    };
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION', this.isDevelopment);
  }

  get natsEnabled(): boolean {
    return this.getBoolean('NATS_ENABLED');
  }

  get natsConfig() {
    return {
      host: this.getString('NATS_HOST'),
      port: this.getNumber('NATS_PORT'),
    };
  }

  get authConfig() {
    return {
      jwtSecret: this.getString('JWT_SECRET_KEY'),
      jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }
}
