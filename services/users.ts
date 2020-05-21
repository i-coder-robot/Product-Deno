import {fetchData,persistData} from "./db.ts";
import {User} from '../models/user.ts'
import createId from "./createId.ts";

type UserData = Pick<User, "name"|"role"|"isAdmin">

export const getUsers=async ():Promise<User[]> =>{
    const users = await fetchData()
    return users
}

export const getUser = async (userId:string):Promise<User|undefined>=>{
    const users=await fetchData();
    return users.find(({id})=>id===userId)
}

export const createUser = async (userData:UserData):Promise<string> =>{
    const users = await fetchData()

    const newUser:User={
        id:createId(),
        name:String(userData.name),
        role:String(userData.role),
        isAdmin:"isAdmin" in userData? Boolean(userData.isAdmin):false,
        added:new Date()
    }

    await persistData([...users,newUser])

    return newUser.id
}

export const updateUser = async (
    userId:string,
    userData:UserData):Promise<void>=>{
        const user = await getUser(userId)
        if (!user){
            throw new Error("用户不存在")
        }
        const updatedUser = {
            ...user,
            name: userData.name!==undefined?String(userData.name):user.name,
            role: userData.role!==undefined?String(userData.role):user.role,
            isAdmin: userData.isAdmin!==undefined?Boolean(userData.isAdmin):user.isAdmin
        }
        const users = await fetchData()
        const filteredUsers=users.filter(user=>user.id!==userId)
        persistData([...filteredUsers,updatedUser])
    }

    export const deleteUser = async (userId:string):Promise<void>=>{
        const users =await getUsers()
        const filteredUsers = users.filter(user=>user.id!==userId)
        persistData(filteredUsers)
    }
