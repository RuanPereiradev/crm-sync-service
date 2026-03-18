import { IsIn, IsObject, IsOptional, IsString } from "class-validator";

export class PartyEventDto{
    @IsString()
    @IsIn(['INSERT', 'UPDATE', 'DELETE'])
    type: string;

    @IsString()
    table: string;

    @IsObject()
    record: Record<string, any>

    @IsOptional()
    @IsObject()
    old_record?: Record<string, any>
}