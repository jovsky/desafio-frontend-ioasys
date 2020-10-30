import axios from 'axios';

// PARAMETROS DE ACESSO À API
const api = axios.create({
  baseURL: "https://empresas.ioasys.com.br/api/v1/",
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
  }
});



api.signIn = async (email, password) => {

  let ret;
  try{
    const url = `users/auth/sign_in`;
    const response = await api.post(url, {email, password});

    const headers = await response.headers;
    const data = await response.data
    
    ret = {
      success: true,
      headers: {
        accessToken: headers["access-token"],
        client: headers.client,
        uid: headers.uid
      },
      data
    }
  }
  catch {
    ret =  {
      success: false
    }
  }

  await new Promise((resolve, reject) => setTimeout(resolve, 1000));

  return ret;

}

api.getFilteredList = async (searchInput, headers) => {

  Object.assign(api.defaults.headers, headers)

  let ret;
  try{
    
    let url;
    if (searchInput !== "") {
      url = `enterprises?${!isNaN(searchInput) ? "enterprise_types" : "name"}=${searchInput}`; 
    }
    else {
      url = `enterprises`;
    }

    const response = await api.get(url, {headers});
    const enterprises = await response.data.enterprises;
    
    ret = {
      success: true,
      foundResults: enterprises.length > 0,
      enterprises: enterprises.map( item => {
        return {
          id: item.id,
          name: item.enterprise_name,
          type_name: item.enterprise_type.enterprise_type_name,
          country: item.country,
          photo: item.photo,
          description: item.description
        }
      })
    }
    
  }
  catch {
    ret =  {
      success: false
    }
  }
  
  return ret;

}

export default api;