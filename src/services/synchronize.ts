import getRealm from './realm';

let realm;

const synchronize = async (data: any) => {
  const { seller, companies } = data;
  const start = new Date().getTime();

  try {    
    realm = await getRealm();
    
    await clearAllData();

    await setSellerData({
      id: seller.id,
      group_id: seller.group_id,
      code: seller.code,
      company: seller.company,
      name: seller.name,
      uid: seller.uid,
      cpf_cnpj: seller.cpf_cnpj,
      rg_ie: seller.rg_ie,
      active: seller.active ? true : false,
      created_at: new Date(),
      updated_at: new Date()
    });

    for (let company of companies) {
      await setCompanyData(seller.id, {
        id: company.id,
        name: company.name
      });

      for (let commercial of company.commercials) {
        await setCommercialData(company.id, {
          id: commercial.id,
          name: commercial.name
        })

        for (let daily of commercial.dailies) {
          await setDailyData(commercial.id, {
            id: daily.id,
            commercial_id: daily.commercial_id,
            client_id: daily.client_id,
            address_id: daily.address_id,
            justification_id: daily.justification_id,
            justified_at: daily.justified_at,
            visited_at: daily.visited_at,
            obs: daily.obs,
          });

          await setClientData(daily.id, {
            id: daily.client.id,
            group_id: daily.client.group_id,
            code: daily.client.code,
            company: daily.client.company,
            name: daily.client.name,
            cpf_cnpj: daily.client.cpf_cnpj,
            rg_ie: daily.client.rg_ie
          })

          await setAddressData(daily.id, {
            id: daily.address.id,
            client_id: daily.address.client_id,
            type: daily.address.type, 
            postcode: daily.address.postcode,
            address: daily.address.address,
            number: parseInt(daily.address.number),
            complement: daily.address.complement,
            city: daily.address.city,
            state: daily.address.state,
            email: daily.address.email,
            contact: daily.address.contact,
            phone: daily.address.phone,
            cell: daily.address.cell
          })
        }
      }

      for (let price of company.prices) {
        await setPriceData(company.id, {
          id: price.id,
          group_id: price.group_id,
          code: price.code,
          name: price.name
        });

        for (let product of price.products) {
          await setProductData( price.id, {
            product_id: product.id,
            name: product.name,
            qtd_start: product.qtd_start,
            qtd_end: product.qtd_end,
            price: parseFloat(product.price)
          });
        }
      }
    }

    console.log('complete synchronize');
    const end = new Date().getTime();
    console.log(end - start);
  } catch (err) {
    console.log('error', err)
  }
}

const clearAllData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('clear all data');
        resolve('');
      }        
      realm.addListener('change', update);

      realm.write(() => {
        let clientList = realm.objects('Client')
        realm.delete(clientList)

        let addressList = realm.objects('Client')
        realm.delete(addressList)

        let dailyList = realm.objects('Daily')
        realm.delete(dailyList)

        let commercialList = realm.objects('Commercial')
        realm.delete(commercialList)

        let productList = realm.objects('Product')
        realm.delete(productList)

        let priceList = realm.objects('Price')
        realm.delete(priceList)

        let companyList = realm.objects('Company')
        realm.delete(companyList)

        let sellerList = realm.objects('Seller')
        realm.delete(sellerList)
      })        
    } catch (err) {
      reject(err);
    }
  })
}

const setSellerData = (data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newSeller: any;
    try {      
      const update = () => {
        realm.removeAllListeners();
        console.log('set seller');
        resolve('');
      }
      realm.addListener('change', update);

      realm.write(() => {
        newSeller = realm.create('Seller', data)          
      })   
    } catch (err) {
      reject(err);
    }    
  })
}

const setCompanyData = (sellerId: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newCompany: any;
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set company');
        resolve('');
      }
      realm.addListener('change', update);

      realm.write(() => {
        let newSeller = realm.objects('Seller').filtered(`id = ${sellerId}`)[0];
        newCompany = realm.create('Company', data);  
        newSeller.companies.push(newCompany);
      })
    } catch (err) {
      reject(err);
    }
  })
}

const setCommercialData = (companyId: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set commercial');
        resolve('');
      }        
      realm.addListener('change', update);

      realm.write(() => {
        let newCompany = realm.objects('Company').filtered(`id = ${companyId}`)[0];
        const newCommercial = realm.create('Commercial', data);
        newCompany.commercials.push(newCommercial);
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setPriceData = (companyId: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set price');
        resolve('');
      }        
      realm.addListener('change', update);

      realm.write(() => {
        let newCompany = realm.objects('Company').filtered(`id = ${companyId}`)[0];
        const newPrice = realm.create('Price', data)
        newCompany.prices.push(newPrice);
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setProductData = (priceId: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set product');
        resolve('');
      }        
      realm.addListener('change', update);

      realm.write(() => {
        let products = realm.objects('Product').sorted('id', true);
        let newPrice = realm.objects('Price').filtered(`id = ${priceId}`)[0];
        data.id = products.length ? products[0].id + 1 : 1;
        const newProduct = realm.create('Product', data)
        newPrice.products.push(newProduct);
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setDailyData = (commercialId: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set daily');
        resolve('');
      }        
      realm.addListener('change', update);

      realm.write(() => {
        let newCommercial = realm.objects('Commercial').filtered(`id = ${commercialId}`)[0];
        const newDaily = realm.create('Daily', data)
        newCommercial.dailies.push(newDaily);
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setClientData = (dailyId: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set client');
        resolve('');
      }        
      realm.addListener('change', update);

      realm.write(() => {
        let newDaily = realm.objects('Daily').filtered(`id = ${dailyId}`)[0];
        const newClient = realm.create('Client', data)
        newDaily.client = newClient;
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setAddressData = (dailyId: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set address');
        resolve('');
      }        
      realm.addListener('change', update);

      realm.write(() => {
        let newDaily = realm.objects('Daily').filtered(`id = ${dailyId}`)[0];
        const newAddress = realm.create('Address', data)
        newDaily.address = newAddress;
      })
    } catch (err) {
      reject(err);
    }      
  })
}

export default synchronize;