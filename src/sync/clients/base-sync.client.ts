import { Logger } from "@nestjs/common";

export abstract class BaseSyncClient{
    protected abstract readonly baseUrl: string;
    protected readonly logger = new Logger(this.constructor.name)

    protected async request(path: string, method: string, body?: any){
        const url = `${this.baseUrl}${path}`;
        const res = await fetch(url, {
            method, 
            headers: {'Content-Type': 'application/json'},
            body: body ? JSON.stringify(body):undefined,
            signal: AbortSignal.timeout(10000)
        });

        if(!res.ok){
            const text = await res.text();
            throw new Error(`${method} ${url} -> ${res.status}: ${text}`);
        }
        return res.json()
    }
    abstract create(data: any): Promise<any>;
    abstract update(crmId: string, data: any): Promise<any>
    abstract remove(crmId: string): Promise<any>
}