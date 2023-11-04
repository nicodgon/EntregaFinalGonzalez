import { usersDao } from "../dao/index.js";

export class UsersService {
  static getByEmail = async(username)=>{
    return await usersDao.getUserByEmail(username);
  }

  static add = async(newUser)=>{
    return await usersDao.addUser(newUser);
  }

  static getById = async(id)=>{
    return await usersDao.getUserById(id);
  }
  
  static updateUser=async(userId,userInfo)=>{
    return await usersDao.update(userId,userInfo)
  }
}
