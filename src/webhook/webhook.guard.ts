import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";

@Injectable()
export class WebHookGuard implements CanActivate{
    constructor(private config: ConfigService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const auth = request.headers['authorization'];
        const secret = this.config.get<string>('WEBHOOK_SECRET');

        if(auth !== `Bearer ${secret}`){
            throw new UnauthorizedException('token inválido')
        }
        return true;
    }
}