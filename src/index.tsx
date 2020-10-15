import React, { useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { View, Text, TouchableOpacity } from 'react-native';

import Seller, { ISeller } from './models/seller';
import Company, { ICompany } from './models/company';

import api from './services/api'
import getRealm from './services/realm'

const App: React.FC = () => {
  const [sellers, setSellers] = useState<ISeller[]>([])
  const [companies, setCompanies] = useState<ICompany[]>([])
  const uid = DeviceInfo.getUniqueId();

  const getData = async () => {
    console.log('getData')
    try {
      const response = await api.post('auth', { uid }, { timeout: 5000 })

      setData(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const setData = async (data: any) => {
    const { seller, companies } = data

    console.log('setData')
    try {
      const realm = await getRealm()

      realm.write(() => {

        let sellerList = realm.objects('Seller')
        realm.delete(sellerList)

        let companyList = realm.objects('Company')
        realm.delete(companyList)

        const newSeller = realm.create('Seller', {
          id: seller.id,
          group_id: seller.group_id,
          code: seller.code,
          company: seller.company,
          name: seller.name,
          uid: uid,
          cpf_cnpj: seller.cpf_cnpj,
          rg_ie: seller.rg_ie,
          active: seller.active ? true : false,
          created_at: new Date(),
          updated_at: new Date()
        })

        companies.forEach((company: any) => {
          let companyData = {
            id: company.id,
            name: company.name
          }
          newSeller.companies.push(companyData)
          // realm.create('Company', companyData)
        })

      })

      sellerList = realm.objects('Seller')
      setSellers(sellerList);

      companyList = realm.objects('Company')
      setCompanies(companyList)

      realm.close()
    } catch (err) {
      console.error(err)
    }
  }

  const getOffline = async () => {
    try {
      const realm = await getRealm()

      console.log('realm db file path:', realm.path);

      let sellerList = realm.objects('Seller')
      setSellers(sellerList)

      let companyList = realm.objects('Company')
      setCompanies(companyList)

      realm.close()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getOffline()
  }, [])

  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#06C' }}>
    <Text style={{ fontSize: 40, color: '#fff' }}>FBS</Text>
    <TouchableOpacity onPress={() => getData()} style={{ marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, backgroundColor: '#fff' }}>
      <Text>Click Me</Text>
    </TouchableOpacity>
    <Text style={{ marginTop: 15, marginBottom: 15, fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{uid}</Text>
    {sellers.map(seller => (
      <Text style={{ fontSize: 18, color: '#fff' }} key={seller.id}>{seller.name}</Text>
    ))}
  </View>);
}

export default App;