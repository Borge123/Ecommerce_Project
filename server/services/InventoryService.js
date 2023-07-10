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
      //console.log(newItem);
      console.log(data.skus.length);
      if (data.skus.length > 1) {
        for (let i = 0; i < data.skus.length - 1; i++) {
          newItem.skus.push(data.skus[i]);
        }
      }

      if (data.categories.length > 1) {
        for (let i = 0; i < data.categories.length - 1; i++) {
          newItem.categories.push(data.categories[i]);
        }
      }

      const response = await new Inventory(newItem).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
