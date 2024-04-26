const SERVER_IP = "http://localhost:3006";
const API_URL = `${SERVER_IP}/api/v1`;

export const ENV ={
    BASE_PATH: SERVER_IP,
    BASE_API: API_URL,
    API_ROUTES:{
        NEWUSER: "users/new-user",
        LISTUSER: "users/list-user",
        GETUSERBYID: "users/get-user-by-id",
        GETUSERBYNAME: "users/get-user-by-name",
        UPDATEUSER: "users/update-user",
        DELETEUSER: "users/delete-user"
    }
}