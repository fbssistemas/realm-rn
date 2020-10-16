import Realm from 'realm';

export interface ICommercial {
  id: number;
  name: string;
}

class Commercial implements ICommercial {
  id: number;
  name: string;

  public static schema: Realm.ObjectSchema = {
    name: 'Commercial',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      company: {
        type: 'linkingObjects',
        objectType: 'Company',
        property: 'commercials',
      },
    },
  }
}

export default Commercial;
