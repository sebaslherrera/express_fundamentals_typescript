import { faker } from "@faker-js/faker";
import boom from "@hapi/boom";

interface Product {
  id: string,
  name: string,
  price: number,
  image: string,
  isBlock: boolean
}

class ProductsService {
  products: Array<Product>;

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data: any) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id: string) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound("Product not found");
    } else if (product.isBlock) {
      throw boom.conflict('product is block')
    }
    return product;
  }

  async update(id: string, changes: {}) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id: string) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    this.products.splice(index, 1);
    return { id };
  }
}

export default ProductsService;
