export function toAcademy(party: Record<string, any>){
    return {
        crm_id: party.id,
        nome_completo: party.nm,
        email: party.em,
        telefone: party.tel,
        whatsapp: party.whatsapp,
    };
}