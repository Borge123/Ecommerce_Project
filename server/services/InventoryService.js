const Inventory = require("../models/Inventory");
module.exports = class InventoryService {
  static async createItem(data) {
    try {
      let skuLength;
      let categoryLength;
      if (data.skus.length != 0) {
        skuLength = data.skus.length - 1;
      } else {
        skuLength = 0;
      }

      if (data.categories.length != 0) {
        categoryLength = data.categories.length - 1;
      } else {
        categoryLength = 0;
      }
      const newItem = {
        item: {
          name: data.item.name,
          description: data.item.description,
        },

        skus: [
          {
            sku: data.skus[skuLength].sku,
            price: data.skus[skuLength].price,
            discount_id: data.skus[skuLength].discount_id,
            stock_quantity: data.skus[skuLength].stock_quantity,
            options: {
              size: data.skus[skuLength].options.size,
              color: data.skus[skuLength].options.color,
              img_url: data.skus[skuLength].options.img_url,
            },
          },
        ],
        categories: [
          {
            category: data.categories[categoryLength].category,
          },
        ],
      };

      // last object of data will be added first so have to end loop at last index - 1
      if (data.skus.length > 1) {
        for (let i = 0; i < data.skus.length - 1; i++) {
          newItem.skus.push(data.skus[i]);
        }
      }

      if (data.categories.length > 1) {
        for (let i = 0; i < data.categories.length - 1; i++) {
          // prevent duplicate category inside the same document
          const result = newItem.categories.find(
            ({ category }) => category === data.categories[i].category
          );

          if (result === undefined) {
            newItem.categories.push(data.categories[i]);
          }
        }
      }

      const response = await new Inventory(newItem).save();
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async checkDuplicateSkus(arr) {
    try {
      let skus = [];

      for (let i = 0; i < arr.length; i++) {
        let sku = arr[i].sku;

        skus.push(sku);
      }

      const allSkus = skus.map((el) => Inventory.find({ "skus.sku": el }));
      const result = await Promise.all(allSkus);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async checkDuplicateCategories(arr) {
    try {
      let categories = [];
      for (let i = 0; i < arr.length; i++) {
        let category = arr[i].category;

        categories.push(category);
      }
      const allCategories = categories.map((el) =>
        Inventory.find({ "categories.category": el })
      );
      const result = await Promise.all(allCategories);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
};
