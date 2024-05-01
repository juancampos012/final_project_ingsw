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

  async updateUser(data) {
    const url = `${this.base_api}/${ENV.API_ROUTES.UPDATEUSER}`;
    console.log(url);
    const response = await fetch(url,{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"},
    })    
    return response;
  }

  async getListIdentifications() {
    const url = `${this.base_api}/${ENV.API_ROUTES.GETLISTUSER}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    const identifications = await response.json();
    return identifications;
  }

  async login(data) {
    const url = `${this.base_api}/${ENV.API_ROUTES.LOGIN}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    return response;
  }

  async createCookie(name, token) {
    const url = `${this.base_api}/${ENV.API_ROUTES.CREATECOOKIE}`;
    const response = await fetch(url, {
      method: 'POST', 
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ name: name, token: token }),
      credentials: 'include'
    });
    return response;
  }

  async verifyToken(token) {
    const url = `${this.base_api}/${ENV.API_ROUTES.VERIFYTOKEN}?token=${token}`;
    const response = await fetch(url,{
      method: 'GET',
      headers: {"content-type": "application/json"}
    });
    return response;
  }
}