import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BaseSyncClient } from "./base-sync.client";

@Injectable()
export class AcademyClient extends BaseSyncClient{
       protected readonly baseUrl: string;
        constructor(config: ConfigService){
            super();
            this.baseUrl = config.get<string>('ACADEMY_API_URL') || '';
        }
    
        create(data: any) { return this.request('/alunos', 'POST', data); }
        update(crmId: string, data: any) { return this.request(`/alunos/crm/${crmId}`, 'PUT', data); }
        remove(crmId: string){return this.request(`/alunos/crm/${crmId}`, 'DELETE'); }
}