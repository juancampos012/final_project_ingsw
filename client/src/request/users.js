import { ENV } from "../utils/constants";

export class User {
  base_api = ENV.BASE_API;
  async newUser(data, imageFile) {
    const url = `${this.base_api}/${ENV.API_ROUTES.NEWUSER}`;
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append('avatar', imageFile);
    const response = await fetch(url,{
        method: 'POST',
        body: formData,
    })
    return response;
  }

  async deleteProduct(id) {
    console.log(id);
    const url = `${this.base_api}/${ENV.API_ROUTES.DELETEPRODUCT}`;
    const response = await fetch(url,{
      method: 'DELETE',
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ id: id }) 
    })
    return response;
}

  async updateProduct(data) {
    console.log(data);
    const url = `${this.base_api}/${ENV.API_ROUTES.EDITPRODUCT}`;
    console.log(url);
    const response = await fetch(url,{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"},
    })    
    return response;
  }

  async readProducts(id) {
    const url = `${this.base_api}/${ENV.API_ROUTES.READPRODUCT}?id=${id}`;
    const response = await fetch(url,{
      method: 'GET',
      headers: {"content-type": "application/json"}
    });
    const data = await response.json();
    return {status: response.status, result: data};
  }
}
