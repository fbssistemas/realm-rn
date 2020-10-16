import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { ICompany } from '../../models/company'

// import { Container } from './styles';

type ICompanyView = {
  children: ReactNode
  company: ICompany
}

const SellerView: React.FC<ICompanyView> = ({ company }) => {
  const prices = company.prices
  const commercials = company.commercials
  return <View>
    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Company</Text>
    <Text style={{ fontSize: 18, color: '#fff' }}>{company.name}</Text>
    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Prices</Text>
    <View style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
      {prices.map((price) => (<Text key={price.id} style={{ fontSize: 16, color: '#eee000' }}>{price.name}</Text>))}
    </View>
    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Commercials</Text>
    <View style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
      {commercials.map((commercial) => (<Text key={commercial.id} style={{ fontSize: 16, color: '#fff' }}>{commercial.name}</Text>))}
    </View>
  </View>;
}

export default SellerView;