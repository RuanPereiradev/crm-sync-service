import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SyncService } from "src/sync/sync.service";
import { WebHookGuard } from "./webhook.guard";
import { PartyEventDto } from "./dto/party-event.dto";

@Controller('webhook')
export class WebhookController{
    constructor(private syncService: SyncService){}

    @Post('party-changed')
    @UseGuards(WebHookGuard)
        partyChanged(@Body() event: PartyEventDto){
            this.syncService.handlePartyEvent(event);
            return {received: true}
        }
}