import Realm from 'realm';
import Client from './client';
import Address from './address';

export interface IOrder {
  id: number
  order_id: number | null
  type: number
  commercial_id: number
  client_id: number | null
  payment_id: number
  installment_id: number
  price_id: number
  obs: string | null
  financy: string | null
  total: number
  created_at: Date
  updated_at: Date
}

class Order implements IOrder {
  id: number
  order_id: number | null
  type: number
  commercial_id: number
  client_id: number | null
  payment_id: number
  installment_id: number
  price_id: number
  obs: string | null
  financy: string | null
  total: number
  created_at: Date
  updated_at: Date

  public static schema: Realm.ObjectSchema = {
    name: 'Order',
    primaryKey: 'id',
    properties: {
      id: 'int',
      order_id: { type: 'int', optional: true },
      type: 'int',
      commercial_id: 'int',
      client_id: { type: 'int', optional: true },
      payment_id: 'int',
      installment_id: 'int',
      price_id: 'int',
      obs: { type: 'string', optional: true },
      financy: { type: 'string', optional: true },
      total: 'float',
      created_at: 'date',
      updated_at: 'date',
      client: {
        type: 'linkingObjects',
        objectType: 'Client',
        property: 'orders',
      },
    },
  }
}

export default Order;
