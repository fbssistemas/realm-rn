import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { ISeller } from '../../models/seller'
import CompanyView from '../CompanyView'

type ISellerView = {
  children: ReactNode
  seller: ISeller
}

const SellerView: React.FC<ISellerView> = ({ seller }) => {
  const companies = seller.companies
  return <View>
    <Text style={{ fontSize: 18, color: '#fff' }}>{seller.name}</Text>
    <View style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
      {companies.map((company) => (<CompanyView key={company.id} company={company} />))}
    </View>
  </View>;
}

export default SellerView;