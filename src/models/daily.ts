import Realm from 'realm';
import Client from './client';
import Address from './address';

export interface IDaily {
  id: number
  commercial_id: number
  client_id: number
  address_id: number
  justification_id: number | null
  justified_at: Date | null
  visited_at: Date | null
  obs: string | null
  client: Client;
  address: Address;
}

class Daily implements IDaily {
  id: number
  commercial_id: number
  client_id: number
  address_id: number
  justification_id: number | null
  justified_at: Date | null
  visited_at: Date | null
  obs: string | null
  client: Client;
  address: Address;

  public static schema: Realm.ObjectSchema = {
    name: 'Daily',
    primaryKey: 'id',
    properties: {
      id: 'int',
      commercial_id: 'int',
      client_id: 'int',
      address_id: 'int',
      justification_id: { type: 'int', optional: true },
      justified_at: { type: 'date', optional: true },
      visited_at: { type: 'date', optional: true },
      obs: { type: 'string', optional: true },
      client: 'Client',
      address: 'Address',
      commercial: {
        type: 'linkingObjects',
        objectType: 'Commercial',
        property: 'dailies',
      },
    },
  }
}

export default Daily;
