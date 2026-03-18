import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WebhookModule } from './webhook/webhook.module';
import { SyncModule } from './sync/sync.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    WebhookModule,
    SyncModule
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
