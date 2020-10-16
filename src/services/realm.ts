import Realm from 'realm'

import Seller from '../models/seller'
import Company from '../models/company'
import Commercial from '../models/commercial';
import Price from '../models/price';
import Product from '../models/product';

const getRealm = () => {
  return Realm.open({
    schema: [Seller, Company, Commercial, Price, Product]
  })
}

export default getRealm