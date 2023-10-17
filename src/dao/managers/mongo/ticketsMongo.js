import { ticketsModel } from "../../models/tickets.model.js";
import { addLogger } from "../../../helpers/logger.js";

const logger = addLogger()

export class TicketsMongo{
  contructor(){
    this.model = ticketsModel
  }
  async createTicket(ticketInfo){
    try {
      const result = await this.model.create(ticketInfo)
      return result
    } catch (error) {
      logger.error("Ha ocurrido un error")
      throw error
    }
  }
}