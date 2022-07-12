const normalizr = require("normalizr");
const fs = require("fs").promises;

class Mensajes {
  constructor(path) {
    this.path = path;
  }

  async fileInJSON() {
    let fileTxt = await fs.readFile(this.path, "utf-8");
    let type = JSON.parse(fileTxt);
    return type;
  }

  async fileSaving(item) {
    let type = JSON.stringify(item);
    await fs.writeFile(this.path, type);
  }

  async getMessages() {
    try {
      const elements = await this.fileInJSON();

      const authorSchema = new normalizr.schema.Entity(
        "author",
        {
          id: String,
          name: String,
          lastname: String,
          alias: String,
          avatar: String,
          age: String,
          email: String,
          fecha: String,
        },
        { idAttribute: "email" }
      );

      const messageSchema = new normalizr.schema.Entity("message", {
        id: "mensajes",
      });

      const postedSchema = new normalizr.schema.Object({
        idAttribute: "id",
        author: authorSchema,
        text: String,
        fecha: String,
      });

      const postArray = new normalizr.schema.Array(postedSchema);

      const posts = normalizr.normalize(elements, postArray);

      posts.result.map((element) => {
        element.author = posts.entities.author[element.author];
      });

      const result = {
        entities: posts.entities,
        result: {
          id: "messages",
          messages: posts.result,
        },
      };

      return result;
    } catch (error) {
      return [];
    }
  }

  async createMessages(data) {
    try {
      const elements = await this.fileInJSON();
      const date = new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const hour = new Date().toLocaleTimeString();
      const fecha = `${date} ${hour}`;
      const newMessage = {
        author: {
          id: (elements.length + 1).toString(),
          name: data.name,
          lastname: data.lastname,
          alias: data.alias,
          avatar: data.avatar,
          age: data.age,
          email: data.email,
          fecha: fecha,
        },
        text: data.msg,
      };
      elements.push(newMessage);

      await this.fileSaving(elements);
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteAllMessages() {
    try {
      await this.fileSaving([]);
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteOneMessage(id) {
    try {
      const elements = await this.fileInJSON();
      const newElements = elements.find((element) => element.id == id);
      await this.fileSaving(newElements);
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async getOneMessage(id) {
    try {
      const elements = await this.fileInJSON();
      const newElements = elements.find((element) => element.id == id);
      return newElements;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async updateOneMessage(id, data) {
    try {
      const elements = await this.fileInJSON();
      const newElements = elements.find((element) => element.id == id);
      const index = elements.indexOf(newElements);
      elements[index] = data;
      await this.fileSaving(elements);
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }
}

module.exports = Mensajes;
