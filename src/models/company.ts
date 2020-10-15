import Realm from 'realm';

export interface ICompany {
  id: number;
  name: string;
}

class Company {
  public id!: number;
  public name!: string;

  public static schema: Realm.ObjectSchema = {
    name: 'Company',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      seller: {
        type: 'linkingObjects',
        objectType: 'Seller',
        property: 'companies'
      }
    }
  }
}

export default Company