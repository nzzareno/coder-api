const fs = require("fs").promises;

class Mensajes {
  constructor(txtNameFile) {
    this.txtNameFile = txtNameFile;
    this.chat = [];
  }

  async fileInJSON() {
    let fileTxt = await fs.readFile(this.txtNameFile, "utf-8");
    let type = JSON.parse(fileTxt);
    return type;
  }

  async fileSaving(item) {
    let type = JSON.stringify(item);
    await fs.writeFile(this.txtNameFile, type);
  }

  async obtenerMensajes() {
    try {
      const chat = await this.fileInJSON();
      return chat;
    } catch (error) {
      console.log(error);
    }
  }

  async createMsg(data) {
    try {
      const chat = await this.fileInJSON();
      const newMsg = {
        email: data.email,
        msg: data.msg,
        date: data.date,
      };
      chat.push(newMsg);
      await this.fileSaving(chat);
      return newMsg;
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarTodosMsg() {
    try {
      await this.fileSaving([]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Mensajes;
