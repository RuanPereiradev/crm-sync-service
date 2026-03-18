import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseClient {
  private readonly logger = new Logger(SupabaseClient.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly serviceRoleKey: string;

  constructor(config: ConfigService) {
    this.baseUrl = config.get<string>('SUPABASE_URL') || '';
    this.apiKey = config.get<string>('SUPABASE_ANON_KEY') || '';
    this.serviceRoleKey = config.get<string>('SUPABASE_SERVICE_ROLE_KEY') || '';
  }

  private get headers() {
    return {
      'Content-Type': 'application/json',
      'apikey': this.apiKey,
      'Authorization': `Bearer ${this.serviceRoleKey}`,
      'Content-Profile': 'compliance',
      'Prefer': 'return=representation',
    };
  }

  async create(data: any): Promise<any> {
    const url = `${this.baseUrl}/rest/v1/client_profiles`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Prefer': 'return=representation,resolution=merge-duplicates',
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`POST ${url} -> ${res.status}: ${text}`);
    }
    return res.json();
  }

  async update(crmId: string, data: any): Promise<any> {
    const url = `${this.baseUrl}/rest/v1/client_profiles?crm_client_id=eq.${crmId}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`PATCH ${url} -> ${res.status}: ${text}`);
    }
    return res.json();
  }

  async remove(crmId: string): Promise<any> {
    const url = `${this.baseUrl}/rest/v1/client_profiles?crm_client_id=eq.${crmId}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: this.headers,
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`DELETE ${url} -> ${res.status}: ${text}`);
    }
    return res.ok;
  }
}
