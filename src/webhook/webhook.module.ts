import { Module } from "@nestjs/common";
import { SyncModule } from "src/sync/sync.module";
import { WebhookController } from "./webhook.controller";

@Module({
    imports: [SyncModule],
    controllers: [WebhookController],
})

export class WebhookModule{}