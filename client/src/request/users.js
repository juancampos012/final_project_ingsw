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

  async login(data) {
    const url = `${this.base_api}/${ENV.API_ROUTES.LOGIN}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    return response;
  }
}
