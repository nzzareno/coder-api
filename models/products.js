const knex = require("knex");

class Productos {
  constructor(config, table) {
    this.db = knex(config);
    this.table = table;
  }

  async getTheProducts() {
    try {
      const savedProducts = await this.db.from(this.table).select("*");
      const productitos = [];
      savedProducts.map((product) => {
        productitos.push({
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.img,
        });
      });
      return productitos;
    } catch (error) {
      return [];
    }
  }

  async createTheProducts(data) {
    try {
      await this.db.from(this.table).insert(data);
      const maxId = this.db.from(this.table).max("id");
      return maxId;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async getOneProduct(id) {
    try {
      const product = await this.db.from(this.table).where("id", id);
      return product;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async updateOneProduct(id, data) {
    try {
      await this.db.from(this.table).where("id", id).update(data);
      return true;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteAllProducts() {
    try {
      await this.db.from(this.table).del();
      return true;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }

  async deleteOneProduct(id) {
    try {
      await this.db.from(this.table).where("id", id).del();
      return true;
    } catch (e) {
      console.error(e);
      throw new Error();
    }
  }
}

module.exports = Productos;
