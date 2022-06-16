const knex = require("knex");

class Mensajes {
  constructor(config, table) {
    this.db = knex(config);
    this.table = table;
  }

  async getMessages() {
    try {
      const savedMessages = await this.db.from(this.table).select("*");
      const messages = [];
      savedMessages.map((message) => {
        messages.push({
          id: message.id,
          email: message.email,
          msg: message.msg,
          fecha: message.fecha,
          // date: new Date().toLocaleDateString("es-ES", {
          //   day: "2-digit",
          //   month: "2-digit",
          //   year: "numeric",
          // }),
          // hour: new Date().toLocaleTimeString(),
        });
      });
      return messages;
    } catch (error) {
      return [];
    }
  }

  async createMessages(data) {
    try {
      await this.db.from(this.table).insert(data);
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteAllMessages() {
    try {
      await this.db.from(this.table).del();
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteOneMessage(id) {
    try {
      await this.db.from(this.table).where("id", id).del();
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async getOneMessage(id) {
    try {
      const message = await this.db
        .from(this.table)
        .where("id", id)
        .select("*");
      return message;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async updateOneMessage(id, data) {
    try {
      await this.db.from(this.table).where("id", id).update(data);
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }
}

module.exports = Mensajes;
