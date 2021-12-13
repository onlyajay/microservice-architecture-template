import api from "../api/axios";

const storedJwt = localStorage.getItem('token');
const config = {
    headers : {
        Authorization : "Bearer " + storedJwt
    }
}
//This function is asynchronous and always returns the result of the call
//If Search contains anything, Search users is called, else Get All is called
const getUsers = async (pageNo, pageSize, search) => {
    let res;
    if (search.length === 0) {
        res = await getAllUsers(pageNo + 1, pageSize);
    }

    else {
        try {
            res = await searchUsers(pageNo + 1, pageSize, search);
        } catch (err) {
            return {
                records: [],
                totalCount: 0
            }
        }
    }
    if (res && res.data && res.data.document && res.data.document.records && res.data.document.records.length > 0) {
        return res.data.document;
    } else {
        return {
            records: [],
            totalCount: 0
        }
    }
    return res.data.document;
}


const addUsers = (data) => {
    return api.post(`/api/users`, data)
}
const updateUsers = (user_id, data) => {
    return api.put(`/api/users/${user_id}`, data)
}
const getAllUsers = (pageNo, pageSize) => {
    return api.get(`/api/users/?pageNo=${pageNo}&pageSize=${pageSize}`, config)
}
const getOneUsers = (user_id) => {
    return api.get(`/api/users/${user_id}`)
}
const searchUsers = (pageNo, pageSize, searchKey) => {
    return api.get(`/api/users/search/${searchKey}/?pageNo=${pageNo}&pageSize=${pageSize}`)
}
const deleteUsers = (user_id) => {
    return api.delete(`/api/users/${user_id}`)
}
export { getUsers, addUsers, updateUsers, getAllUsers, getOneUsers, searchUsers, deleteUsers }