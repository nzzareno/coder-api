const faker = require("faker");

class Productos {
  constructor(schema) {
    this.schema = schema;
  }

  async getTheProducts() {
    try {
      const product = await this.schema.find();
      return product;
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
        title: data.title,
        price: data.price,
        img: data.img,
      };

      await this.schema.create(newProduct);
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async getOneProduct(id) {
    try {
      const product = await this.schema.find({ _id: id });
      return product;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async updateOneProduct(id, data) {
    try {
      const element = await this.schema.updateOne(
        { _id: id },
        {
          title: data.title,
          price: data.price,
          img: data.img,
        }
      );
      return element;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteAllProducts() {
    try {
      await this.schema.deleteMany({});
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteOneProduct(id) {
    try {
      const element = await this.schema.deleteOne({ _id: id });
      return element;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }
}

module.exports = Productos;
