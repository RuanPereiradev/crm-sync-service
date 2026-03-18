import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { FinanceiroClient } from './clients/financeiro.client';
import { AcademyClient } from './clients/academy.client';
import { SupabaseClient } from './clients/supabase.client';

@Module({
  providers: [SyncService, FinanceiroClient, AcademyClient, SupabaseClient],
  exports: [SyncService],
})
export class SyncModule {}
