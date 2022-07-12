const faker = require("faker");
const fs = require("fs").promises;
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);

class Productos {
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

  async getTheProducts() {
    try {
      const elements = await this.fileInJSON();
      return elements;
    } catch (error) {
      return [];
    }
  }

  async getFakeProducts() {
    try {
      const fakeProducts = [];
      for (let i = 0; i < 5; i++) {
        const fakeProduct = {
          id: i + 1,
          title: faker.commerce.productName(),
          price: faker.commerce.price(),
          img: faker.image.imageUrl(),
        };
        fakeProducts.push(fakeProduct);
      }
      return fakeProducts;
    } catch (error) {
      return [];
    }
  }

  async createTheProducts(data) {
    try {
      const newProduct = {
        id: nanoid(),
        title: data.title,
        price: data.price,
        img: data.img,
      };
      await this.fileSaving(newProduct);
      return newProduct;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async getOneProduct(id) {
    try {
      const product = await this.fileInJSON();
      const newProduct = product.find((element) => element.id == id);
      return newProduct;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async updateOneProduct(id, data) {
    try {
      const product = await this.fileInJSON();
      const newProduct = product.find((element) => element.id == id);
      const index = product.indexOf(newProduct);
      product[index] = data;
      await this.fileSaving(product);
      return true;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteAllProducts() {
    try {
      await this.fileSaving([]);
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteOneProduct(id) {
    try {
      const product = await this.fileInJSON();
      const newProduct = product.find((element) => element.id == id);
      const index = product.indexOf(newProduct);
      product.splice(index, 1);
      await this.fileSaving(product);
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }
}

module.exports = Productos;
