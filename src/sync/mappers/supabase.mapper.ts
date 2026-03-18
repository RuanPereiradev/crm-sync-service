export function toSupabase(party: Record<string, any>) {
  return {
    crm_client_id: party.id,
    name: party.nm,
    razao_social: party.rs,
    nome_fantasia: party.nf,
    doc: party.doc,
    tipo: party.tp,
    status: party.st,
    email: party.em,
    phone: party.tel,
    whatsapp: party.whatsapp,
    cep: party.cep,
    endereco: party.end,
    cidade: party.cid,
    uf: party.uf,
    bairro: party.bairro,
    grupo: party.grupo,
    origem: 'crm',
    notas: party.notas,
  };
}
