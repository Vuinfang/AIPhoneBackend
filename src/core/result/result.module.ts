import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from './result.entity';
import { FeaturesModule } from '../../shared';

@Module({
  imports: [TypeOrmModule.forFeature([ResultEntity]), FeaturesModule],
  providers: [ResultService],
  controllers: [ResultController],
  exports: [ResultService],
})
export class ResultModule {}
