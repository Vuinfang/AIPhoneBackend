import { Module } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { AwsS3Service } from './aws-s3.service';
import { GeneratorService } from './generator.service';
import { ValidatorService } from './validator.service';

@Module({
  providers: [
    ApiConfigService,
    AwsS3Service,
    GeneratorService,
    ValidatorService,
  ],
  exports: [ApiConfigService, AwsS3Service, GeneratorService, ValidatorService],
})
export class ServicesModule {}
