const SERVER_IP = "http://localhost:3006";
const API_URL = `${SERVER_IP}/api/v1`;

export const ENV ={
    BASE_PATH: SERVER_IP,
    BASE_API: API_URL,
    API_ROUTES_USER:{
        NEWUSER: "users/new-user",
        LOGIN: "users/login",
        LISTUSER: "users/list-user",
        GETLISTUSER: "users/list-identifications",
        GETUSERBYID: "users/get-user-by-id",
        GETUSERBYIDENTIFICATION: "users/get-user-by-identification",
        GETUSERBYNAME: "users/get-user-by-name",
        UPDATEUSER: "users/update-user",
        DELETEUSER: "users/delete-user",
        CREATECOOKIE: "users/create-cookie",
        VERIFYTOKEN: "users/verify-token",
    },
    API_ROUTES_TRUCK:{
        NEWTRUCK: "trucks/new-truck",
        GETLISTTRUCKS: "trucks/list-truck",
        GETLISTLICENSEPLATES: "trucks/list-license-plate",  
        GETTRUCKBYLICENCEPLATE: "trucks/get-truck",  
        DELETETRUCKBYID: "trucks/delete-by-id",
        GETTRUCKBYID: "trucks/get-by-id",
        UPDTAETRUCKSTATUS: "trucks/update-truck",
    },
    API_ROUTES_TRIP:{
        NEWTRIP: "trips/new-trip",
        GETLISTTRIP: "trips/list-trips",
        GETTRIt: "trips/get-list",
        GETUSERTTRUCKBYID: "usertrucks/get-usertruck-id",
        UPDATETRIP: "trips/update-trip"
    },
    API_ROUTES_TIRE:{
        NEWTIRE: "tires/new-tire",
        GETTIREBYTRUCKID: "tires/get-tire-by-truck-id",  
    },
    API_ROUTES_REFUELING:{
        NEWREFUELING: "refueling/new-refueling",
    },
    API_ROUTES_MAINTENANCE:{
        NEWMAINTENANCE: "maintenance/new-maintenance"
    }
}