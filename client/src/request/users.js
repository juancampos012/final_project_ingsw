import { ENV } from "../utils/constants";

export class User {
  base_api = ENV.BASE_API;
  async newUser(data, imageFile) {
    const url = `${this.base_api}/${ENV.API_ROUTES_USER.NEWUSER}`;
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
    const url = `${this.base_api}/${ENV.API_ROUTES_USER.UPDATEUSER}`;
    const response = await fetch(url,{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"},
    })    
    return response;
  }

  async getUserByIdentification(identification) {
    const url = `${this.base_api}/${ENV.API_ROUTES_USER.GETUSERBYIDENTIFICATION}?identification=${identification}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }

  async getUserById(id) {
    const url = `${this.base_api}/${ENV.API_ROUTES_USER.GETUSERBYID}?id=${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }

  async getListUser() {
    const url = `${this.base_api}/${ENV.API_ROUTES_USER.LISTUSER}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    const users = await response.json();
    return users;
  }


  async getListIdentifications() {
    const url = `${this.base_api}/${ENV.API_ROUTES_USER.GETLISTUSER}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    });
    const identifications = await response.json();
    return identifications;
  }

  async login(data) {
    const url = `${this.base_api}/${ENV.API_ROUTES_USER.LOGIN}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    return response;
  }

  async createCookie(name, token) {
    const url = `${this.base_api}/${ENV.API_ROUTES_USER.CREATECOOKIE}`;
    const response = await fetch(url, {
      method: 'POST', 
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ name: name, token: token }),
      credentials: 'include'
    });
    return response;
  }

  async verifyToken(token) {
    const url = `${this.base_api}/${ENV.API_ROUTES_USER.VERIFYTOKEN}?token=${token}`;
    const response = await fetch(url,{
      method: 'GET',
      headers: {"content-type": "application/json"}
    });
    return response;
  }
}