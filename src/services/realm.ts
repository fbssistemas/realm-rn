import Realm from 'realm'

import Seller from '../models/seller'
import Company from '../models/company'
import Commercial from '../models/commercial';
import Price from '../models/price';
import Product from '../models/product';
import Daily from '../models/daily';
import Client from '../models/client';
import Address from '../models/address';

const getRealm = () => {
  return Realm.open({
    schema: [Seller, Company, Commercial, Price, Product, Daily, Client, Address]
  })
}

export default getRealm