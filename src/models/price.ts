import Realm from 'realm';
import Product from './product';

export interface IPrice {
  id: number;
  group_id: number;
  code: number | null;
  name: string;
}

class Price implements IPrice {
  id: number;
  group_id: number;
  code: number;
  name: string;
  products: Realm.List<Product>;

  static schema: Realm.ObjectSchema = {
    name: 'Price',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      group_id: 'int',
      code: { type: 'int', optional: true },
      name: 'string',
      products: 'Product[]',
    },
  };
}

export default Price;
