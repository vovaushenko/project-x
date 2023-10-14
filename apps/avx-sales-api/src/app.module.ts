import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpportunitiesModule } from './opportunities/opportunities.module';

@Module({
  imports: [OpportunitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
