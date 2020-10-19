import React, { useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import { ISeller } from './models/seller';

import SellerView from './components/SellerView';
import synchronize from './services/synchronize'

import api from './services/api';

const App: React.FC = () => {
  const [sellers, setSellers] = useState<ISeller[]>([])
  const uid = DeviceInfo.getUniqueId();

  const getData = async () => {
    try {
      console.log('get Data')
      const response = await api.post('auth', { uid }, { timeout: 5000 })
      console.log('complete Response')
      synchronize(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  
  /*
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
  */
  return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#06C' }}>
    <View>
      <Text style={{ fontSize: 40, color: '#fff' }}>FBS</Text>
      <TouchableOpacity onPress={() => getData()} style={{ marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, backgroundColor: '#fff' }}>
        <Text>Click Me</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 15, marginBottom: 15, fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{uid}</Text>
    </View>
    
  </View>);
}

export default App;