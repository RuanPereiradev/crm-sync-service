import { Injectable, Logger } from '@nestjs/common';
import { PartyEventDto } from 'src/webhook/dto/party-event.dto';
import { FinanceiroClient } from './clients/financeiro.client';
import { AcademyClient } from './clients/academy.client';
import { SupabaseClient } from './clients/supabase.client';
import { toFinanceiro } from './mappers/financeiro.mapper';
import { toAcademy } from './mappers/academy.mapper';
import { toSupabase } from './mappers/supabase.mapper';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  constructor(
    private financeiro: FinanceiroClient,
    private academy: AcademyClient,
    private supabase: SupabaseClient,
  ) {}

  async handlePartyEvent(event: PartyEventDto) {
    const { type, record } = event;
    this.logger.log(`[${type}] party: ${record.nm} (${record.id})`);

    const targets = [
      { name: 'supabase', client: this.supabase, data: toSupabase(record) },
      { name: 'financeiro', client: this.financeiro, data: toFinanceiro(record) },
      { name: 'academy', client: this.academy, data: toAcademy(record) },
    ];

    const results = await Promise.allSettled(
      targets.map(({ client, data }) => {
        switch (type) {
          case 'INSERT':
            return client.create(data);
          case 'UPDATE':
            return client.update(record.id, data);
          case 'DELETE':
            return client.remove(record.id);
        }
      }),
    );

    results.forEach((result, i) => {
      if (result.status === 'rejected') {
        this.logger.error(`Sync ${targets[i].name} falhou: ${result.reason}`);
      } else {
        this.logger.log(`Sync ${targets[i].name}: ok`);
      }
    });
  }
}
