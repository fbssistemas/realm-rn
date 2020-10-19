import Realm from 'realm';

export interface IAddress {
  id: number
  client_id: number
  type: number
  postcode: string
  address: string
  number: number
  complement: string | null
  district: string
  city: string
  state: string
  email: string | null
  contact: string | null
  phone: string | null
  cell: string | null
}

class Address implements IAddress {
  id: number
  client_id: number
  type: number
  postcode: string
  address: string
  number: number
  complement: string | null
  district: string
  city: string
  state: string
  email: string | null
  contact: string | null
  phone: string | null
  cell: string | null

  public static schema: Realm.ObjectSchema = {
    name: 'Address',
    primaryKey: 'id',
    properties: {
      id: 'int',
      client_id: 'int',
      type: 'int', 
      postcode: 'string',
      address: 'string',
      number: 'int',
      complement: { type: 'string', optional: true },
      city: 'string',
      state: 'string',
      email: { type: 'string', optional: true },
      contact: { type: 'string', optional: true },
      phone: { type: 'string', optional: true },
      cell: { type: 'string', optional: true },
      daily: {
        type: 'linkingObjects',
        objectType: 'Daily',
        property: 'address',
      },
    },
  }
}

export default Address;
