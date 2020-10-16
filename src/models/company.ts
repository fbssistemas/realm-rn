import Realm from 'realm';
import Price from './price';
import Commercial from './commercial';

export interface ICompany {
  id: number;
  name: string;
  commercials: Realm.List<Commercial>;
  prices: Realm.List<Price>;
}

class Company implements ICompany {
  id: number;
  name: string;
  commercials: Realm.List<Commercial>;
  prices: Realm.List<Price>;

  public static schema: Realm.ObjectSchema = {
    name: 'Company',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      commercials: 'Commercial[]',
      prices: 'Price[]',
      seller: {
        type: 'linkingObjects',
        objectType: 'Seller',
        property: 'companies',
      },
    },
  };
}

export default Company;
