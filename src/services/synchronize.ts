import getRealm from './realm';

let realm;

const synchronize = async (data: any) => {
  const { seller, companies } = data;
  const start = new Date().getTime();

  try {    
    realm = await getRealm();
    
    await clearAllData('Address');
    await clearAllData('Client');
    await clearAllData('Daily');
    await clearAllData('Commercial');
    await clearAllData('Product');
    await clearAllData('Price');
    await clearAllData('Company');
    await clearAllData('Seller');
    await clearAllData('Order');

    let newSeller = await setSellerData({
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
      let newCompany = await setCompanyData(newSeller, {
        id: company.id,
        name: company.name
      });

      for (let commercial of company.commercials) {
        let newCommercial = await setCommercialData(newCompany, {
          id: commercial.id,
          name: commercial.name
        });

        for (let daily of commercial.dailies) {
          let newDaily = await setDailyData(newCommercial, {
            id: daily.id,
            commercial_id: daily.commercial_id,
            client_id: daily.client_id,
            address_id: daily.address_id,
            justification_id: daily.justification_id,
            justified_at: daily.justified_at,
            visited_at: daily.visited_at,
            obs: daily.obs,
          });

          let newClient = await setClientData(newDaily, {
            id: daily.client.id,
            group_id: daily.client.group_id,
            code: daily.client.code,
            company: daily.client.company,
            name: daily.client.name,
            cpf_cnpj: daily.client.cpf_cnpj,
            rg_ie: daily.client.rg_ie
          })

          for (let order of daily.client.orders) {            
            await setOrderData(newClient, {
              id: order.id,
              order_id: order.order_id,
              type: order.type,
              commercial_id: order.commercial_id,
              client_id: order.client_id,
              payment_id: order.payment_id,
              installment_id: order.installment_id,
              price_id: order.price_id,
              obs: order.obs,
              financy: order.financy,
              total: parseFloat(order.total),
              created_at: new Date(order.created_at),
              updated_at: new Date(order.updated_at),
            });
          }

          let newAddress = await setAddressData(newDaily, {
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
          });
        }
      }

      for (let price of company.prices) {
        let newPrice = await setPriceData(newCompany, {
          id: price.id,
          group_id: price.group_id,
          code: price.code,
          name: price.name
        });

        for (let product of price.products) {
          let newProduct = await setProductData(newPrice, {
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
    realm.close()
  } catch (err) {
    console.log('error', err)
  }
}

const clearAllData = (schemaName: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log(`clear all data of ${schemaName}`);
        resolve('');
      }        
      realm.addListener('change', update);

      realm.write(() => {
        let list = realm.objects(schemaName)
        realm.delete(list)
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
        resolve(newSeller);
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

const setCompanyData = (seller: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newCompany: any;
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set company');
        resolve(newCompany);
      }
      realm.addListener('change', update);

      realm.write(() => {
        //let newSeller = realm.objects('Seller').filtered(`id = ${sellerId}`)[0];
        newCompany = realm.create('Company', data);  
        //newSeller.companies.push(newCompany);
        seller.companies.push(newCompany);
      })
    } catch (err) {
      reject(err);
    }
  })
}

const setCommercialData = (company: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newCommercial;
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set commercial');
        resolve(newCommercial);
      }        
      realm.addListener('change', update);

      realm.write(() => {
        // let newCompany = realm.objects('Company').filtered(`id = ${companyId}`)[0];
        newCommercial = realm.create('Commercial', data);
        company.commercials.push(newCommercial);
        // newCompany.commercials.push(newCommercial);
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setPriceData = (company: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newPrice;
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set price');
        resolve(newPrice);
      }        
      realm.addListener('change', update);

      realm.write(() => {
        // let newCompany = realm.objects('Company').filtered(`id = ${companyId}`)[0];
        newPrice = realm.create('Price', data)
        company.prices.push(newPrice);
        // newCompany.prices.push(newPrice);
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setProductData = (price: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newProduct;
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set product');
        resolve(newProduct);
      }        
      realm.addListener('change', update);

      realm.write(() => {
        // let newPrice = realm.objects('Price').filtered(`id = ${priceId}`)[0];
        let products = realm.objects('Product').sorted('id', true);
        data.id = products.length ? products[0].id + 1 : 1;
        newProduct = realm.create('Product', data)
        price.products.push(newProduct);
        // newPrice.products.push(newProduct);
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setDailyData = (commercial: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newDaily;
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set daily');
        resolve(newDaily);
      }        
      realm.addListener('change', update);

      realm.write(() => {
        // let newCommercial = realm.objects('Commercial').filtered(`id = ${commercialId}`)[0];
        newDaily = realm.create('Daily', data)
        commercial.dailies.push(newDaily);
        // newCommercial.dailies.push(newDaily);
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setClientData = (daily: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newClient;
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set client');
        resolve(newClient);
      }        
      realm.addListener('change', update);

      realm.write(() => {
        // let newDaily = realm.objects('Daily').filtered(`id = ${dailyId}`)[0];
        newClient = realm.create('Client', data)
        daily.client = newClient;
        // newDaily.client = newClient;
      })
    } catch (err) {
      reject(err);
    }      
  })    
}

const setAddressData = (daily: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newAddress;
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set address');
        resolve(newAddress);
      }        
      realm.addListener('change', update);

      realm.write(() => {
        // let newDaily = realm.objects('Daily').filtered(`id = ${dailyId}`)[0];
        newAddress = realm.create('Address', data)
        daily.address = newAddress;
        // newDaily.address = newAddress;
      })
    } catch (err) {
      reject(err);
    }      
  })
}

const setOrderData = (client: any, data: {}) => {
  return new Promise(async (resolve, reject) => {
    let newOrder;
    try {
      const update = () => {
        realm.removeAllListeners();
        console.log('set order');
        resolve(newOrder);
      }        
      realm.addListener('change', update);

      realm.write(() => {
        newOrder = realm.create('Order', data)
        client.orders.push(newOrder);
      })
    } catch (err) {
      reject(err);
    }      
  })
}

export default synchronize;