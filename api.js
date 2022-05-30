const fs = require("fs").promises;
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);

class Productos {
  constructor(txtNameFile) {
    this.txtNameFile = txtNameFile;
    this.productos = [];
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

  // async obtenerMensajes() {
  //   try {
  //     const chat = await this.fileInJSON();
  //     return chat;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async obtenerProductos() {
    try {
      const productos = await this.fileInJSON();
      return productos;
    } catch (error) {
      console.log(error);
    }
  }

  async obtenerProducto(id) {
    try {
      const productos = await this.fileInJSON();
      const producto = productos.find((producto) => producto.id === Number(id));
      return producto;
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      const productos = await this.fileInJSON();
      const newProduct = {
        id: Number(nanoid()),
        price: Number(data.price),
        title: data.title,
        thumbnail: data.thumbnail,
      };

      productos.push(newProduct);
      await this.fileSaving(productos);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  // async createMsg(data) {
  //   try {
  //     const chat = await this.fileInJSON();
  //     const newMsg = {
  //       email: data.email,
  //       msg: data.msg,
  //       date: data.date,
  //     };
  //     chat.push(newMsg);
  //     await this.fileSaving(chat);
  //     return newMsg;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async eliminarProducto(id) {
    try {
      const productos = await this.fileInJSON();
      const producto = productos.find((producto) => producto.id == id);
      const index = productos.indexOf(producto);
      productos.splice(index, 1);
      await this.fileSaving(productos);
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarTodos() {
    try {
      await this.fileSaving([]);
    } catch (error) {
      console.log(error);
    }
  }

  // async eliminarTodosMsg() {
  //   try {
  //     await this.fileSaving([]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async actualizarTodos() {
    try {
      await this.fileSaving([]);
    } catch (error) {
      console.log(error);
    }
  }

  async actualizarProducto(id, data) {
    try {
      const productos = await this.fileInJSON();
      const producto = productos.find((producto) => producto.id == id);
      const index = productos.indexOf(producto);
      productos[index] = {
        ...producto,
        ...data,
      };
      await this.fileSaving(productos);
      return productos[index];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Productos;
