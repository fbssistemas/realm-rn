import Realm from 'realm';

export interface IClient {
  id: number
  group_id: number
  code: number | null
  company: string
  name: string
  cpf_cnpj: string
  rg_ie: string | null
}

class Client implements IClient {
  id: number
  group_id: number
  code: number | null
  company: string
  name: string
  cpf_cnpj: string
  rg_ie: string | null

  public static schema: Realm.ObjectSchema = {
    name: 'Client',
    primaryKey: 'id',
    properties: {
      id: 'int',
      group_id: 'int',
      code: { type: 'int', optional: true },
      company: 'string',
      name: 'string',
      cpf_cnpj: 'string',
      rg_ie: 'string',
      commercial: {
        type: 'linkingObjects',
        objectType: 'Commercial',
        property: 'clients',
      },
    },
  }
}

export default Client;
