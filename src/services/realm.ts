import Realm from 'realm'

import Seller from '../models/seller'
import Company from '../models/company'

const getRealm = () => {
  return Realm.open({
    schema: [Seller, Company]
  })
}

export default getRealm