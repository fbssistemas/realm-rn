import React, { useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import { ISeller } from './models/seller';

import SellerView from './components/SellerView';

import api from './services/api'
import getRealm from './services/realm'

const App: React.FC = () => {
  const [sellers, setSellers] = useState<ISeller[]>([])
  const uid = DeviceInfo.getUniqueId();

  const getData = async () => {
    console.log('getData2')
    try {
      const response = await api.post('auth', { uid }, { timeout: 5000 })

      setData(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const setData = async (data: any) => {
    const { seller, companies } = data

    console.log('setData2')
    try {
      const realm = await getRealm()

      realm.write(() => {

        let sellerList = realm.objects('Seller')
        realm.delete(sellerList)

        let companyList = realm.objects('Company')
        realm.delete(companyList)

        let commercialList = realm.objects('Commercial')
        realm.delete(commercialList)

        let priceList = realm.objects('Price')
        realm.delete(priceList)

        let productList = realm.objects('Product')
        realm.delete(productList)

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
          const newCompany = realm.create('Company', companyData)
          newSeller.companies.push(newCompany);

          company.commercials.forEach((commercial: any) => {
            let commercialData = {
              id: commercial.id,
              name: commercial.name
            }
            const newCommercial = realm.create('Commercial', commercialData)
            newCompany.commercials.push(newCommercial)
          })

          company.prices.forEach((price: any) => {
            let priceData = {
              id: price.id,
              group_id: price.group_id,
              code: price.code,
              name: price.name
            }
            const newPrice = realm.create('Price', priceData)
            newCompany.prices.push(newPrice);

            price.products.forEach((product: any) => {
              let products = realm.objects('Product').sorted('id', true);
              let productData = {
                id: products.length ? products[0].id + 1 : 1,
                product_id: product.id,
                name: product.name,
                qtd_start: product.qtd_start,
                qtd_end: product.qtd_end,
                price: parseFloat(product.price)
              }
              const newProduct = realm.create('Product', productData)
              newPrice.products.push(newProduct)
            })
          })        
        })
      })

      sellerList = realm.objects('Seller')
      setSellers(sellerList);
      console.log('complete')
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

      realm.close()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getOffline()
  }, [])

  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#06C' }}>
    <View>
      <Text style={{ fontSize: 40, color: '#fff' }}>FBS</Text>
      <TouchableOpacity onPress={() => getData()} style={{ marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, backgroundColor: '#fff' }}>
        <Text>Click Me</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 15, marginBottom: 15, fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{uid}</Text>
    </View>
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
      <ScrollView>
        {sellers.map(seller => (
          <SellerView key={seller.id} seller={seller} />
        ))}
      </ScrollView>
    </SafeAreaView>
  </View>);
}

export default App;