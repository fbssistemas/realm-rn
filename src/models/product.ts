import Realm from 'realm';

export interface IProduct {
  id: number;
  product_id: number;
  name: string;
  qtd_start: number;
  qtd_end: number;
  price: number;
}

class Product implements IProduct {
  id: number
  product_id: number;
  name: string
  qtd_start: number
  qtd_end: number
  price: number

  public static schema: Realm.ObjectSchema = {
    name: 'Product',
    primaryKey: 'id',
    properties: {
      id: { type: 'int', indexed: true },
      product_id: { type: 'int'},
      name: 'string',
      qtd_start: { type: 'int' },
      qtd_end: { type: 'int' },
      price: { type: 'float' },
    },
  }
}

export default Product;
