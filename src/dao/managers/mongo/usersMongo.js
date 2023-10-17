import { usersModel } from "../../models/users.model.js";
import { addLogger } from "../../../helpers/logger.js";

const logger = addLogger();

export class UsersMongo {
  constructor() {
    this.model = usersModel;
  }

  async addUser(user) {
    try {
      const newUser = await this.model.create(user);
      return newUser;
    } catch (error) {
      logger.error("Ha ocurrido un error");
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
      logger.error("Ha ocurrido un error");
    }
  }
  async getUserById(id) {
    try {
      const userFound = await this.model.findById(id);
      if (userFound) {
        return userFound;
      } else {
        return null;
      }
    } catch (error) {
      logger.error("Ha ocurrido un error");
    }
  }

  async checkRole(pass, email) {
    try {
      const arr = [email];
      const exists = arr.some((e) => e.includes("@coder.com"));
      if (pass === "adminCod3r123" && exists) {
        return "admin";
      } else {
        return "user";
      }
    } catch (error) {
      logger.error("Ha ocurrido un error");
    }
  }
}
