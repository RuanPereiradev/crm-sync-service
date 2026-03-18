export function toFinanceiro(party: Record<string, any>){
    return{
        crm_id: party.id,
        nome: party.nm,
        razao_social: party.rs,
        documento: party.doc,
        email: party.em,
        telefone: party.tel,
        cidade: party.cid,
        uf: party.uf,
        tipo: party.tp,
        status: party.st
    }
}