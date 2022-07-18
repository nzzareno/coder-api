class Mensajes {
  constructor(schema) {
    this.schema = schema;
  }

  async getMessages() {
    try {
      return await this.schema.find();
    } catch (error) {
      return [];
    }
  }

  async getUser() {}

  async createMessages(data) {
    try {
      const newMessage = {
        email: data.email,
        msg: data.msg,
        name: data.name,
        age: data.age,
        lastname: data.lastname,
        alias: data.alias,
        avatar: data.avatar,
        fecha: new Date().toUTCString(),
      };
      const message = new this.schema(newMessage);
      await message.save();
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteAllMessages() {
    try {
      return await this.schema.deleteMany({});
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteOneMessage(id) {
    try {
      const element = await this.schema.deleteOne({ _id: id });
      return element;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async getOneMessage(id) {
    try {
      const element = await this.schema.find({ _id: id });
      return element;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async updateOneMessage(id, data) {
    try {
      const elements = await this.schema.find();
      const newElements = elements.map((message) => {
        if (message.id == id) {
          return {
            ...message,
            email: data.email,
            msg: data.msg,
            name: data.name,
            age: data.age,
            lastname: data.lastname,
            alias: data.alias,
            avatar: data.avatar,
          };
        } else {
          return message;
        }
      });
      await this.schema.deleteMany({});
      await this.schema.insertMany(newElements);
      return newElements;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }
}

module.exports = Mensajes;
