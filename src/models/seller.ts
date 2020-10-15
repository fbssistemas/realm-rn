import Realm from 'realm';
import Company from './company';

export interface ISeller {
  id: number;
  group_id: number;
  code: number | null;
  company: string;
  name: string;
  uid: string;
  cpf_cnpj: string;
  rg_ie: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  companies: Realm.List<Company>;
}

class Seller implements ISeller {
  public id!: number;
  public group_id!: number;
  public code!: number;
  public company!: string;
  public name!: string;
  public uid!: string;
  public cpf_cnpj!: string;
  public rg_ie!: string;
  public active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
  public companies!: Realm.List<Company>

  public static schema: Realm.ObjectSchema = {
    name: 'Seller',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      group_id: 'int',
      code: { type: 'int', optional: true },
      company: 'string',
      name: 'string',
      uid: { type: 'string', optional: true },
      cpf_cnpj: 'string',
      rg_ie: { type: 'string', optional: true },
      active: 'bool',
      created_at: 'date',
      updated_at: 'date',
      companies: 'Company[]'
    }
  }
}

export default Seller;