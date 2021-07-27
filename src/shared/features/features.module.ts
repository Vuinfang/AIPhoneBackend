import { Module } from '@nestjs/common';
// for backend sent http request $ npm i --save @nestjs/axios
import { HttpRequestService } from './httpRequest.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [HttpRequestService],
  exports: [HttpRequestService],
})
export class FeaturesModule {}
