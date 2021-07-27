import { Global, Module } from '@nestjs/common';
import { ServicesModule } from './services';
import { FeaturesModule } from './features';
@Global()
@Module({
  imports: [ServicesModule, FeaturesModule],
  exports: [ServicesModule, FeaturesModule],
})
export class SharedModule {}
