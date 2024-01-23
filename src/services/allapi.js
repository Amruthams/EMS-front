import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";



//add employee

export const addUser=async(body,header)=>{
    return await commonApi("POST",`${BASE_URL}/add`,body,header)
}

//get  employee

export const allUsers=async(search)=>{

    return await commonApi("GET",`${BASE_URL}/get-all-users?search=${search}`,"")
    //here ? is the query parameter

}

//delete

export const deleteUser=async(id)=>{
    return await commonApi("DELETE",`${BASE_URL}/delete-user/${id}`,{})

}


//edit employee

export const editUser=async(id,body,header)=>{
    return await commonApi("PUT",`${BASE_URL}/edit-user/${id}`,body,header)
}