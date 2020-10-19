import Realm from 'realm';
import Daily from './daily';

export interface ICommercial {
  id: number;
  name: string;
  dailies: Realm.List<Daily>
}

class Commercial implements ICommercial {
  id: number;
  name: string;
  dailies: Realm.List<Daily>

  public static schema: Realm.ObjectSchema = {
    name: 'Commercial',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      dailies: 'Daily[]',
      company: {
        type: 'linkingObjects',
        objectType: 'Company',
        property: 'commercials',
      },
    },
  }
}

export default Commercial;
