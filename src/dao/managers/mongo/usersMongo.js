import { usersModel } from "../../models/users.model.js";

export class UsersMongo {
  constructor() {
    this.model = usersModel;
  }

  async addUser(user) {
    try {
      const newUser = await this.model.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  async getUserByEmail(email) {
    try {
      const userFound = await this.model.findOne({ email: email });
      if (userFound) {
        return userFound;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id) {
    try {
      const userFound = await this.model.findById(id);
      if (userFound) {
        return userFound;
      } else {
        return null
      }
    } catch (error) {
      throw error;
    }
  }

  async checkRole(pass,email){
    try {
      const arr = [email]
      const exists = arr.some(e=>e.includes("@coder.com"))
      if(pass==='adminCod3r123' && exists){
        return 'admin'
      }else {
        return 'user'
      }
    } catch (error) {
      throw error;
    }
  }
}
