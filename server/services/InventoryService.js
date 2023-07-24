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
          //prevent duplicate sku objects being added
          const result = newItem.skus.find(
            ({ sku }) => sku === data.skus[i].sku
          );

          if (!result) {
            newItem.skus.push(data.skus[i]);
          }
        }
      }

      if (data.categories.length > 1) {
        for (let i = 0; i < data.categories.length - 1; i++) {
          // prevent duplicate category inside the same document
          const result = newItem.categories.find(
            ({ category }) => category === data.categories[i].category
          );

          if (!result) {
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

  static async getAllItems() {
    try {
      const result = await Inventory.find();
      if (result.length > 0) {
        await result[0].populate({
          path: "item.discount_id",
          select: { _id: 1, name: 1, discount_percent: 1, active: 1 },
          strictPopulate: false,
        });
      }

      //console.log(result[0]);
      // await result[0].depopulate("discount_id");
      if (result.length > 0) {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getOneItem(id) {
    try {
      const result = await Inventory.findOne({
        _id: id,
      }).populate({
        path: "item.discount_id",
        select: { _id: 1, name: 1, discount_percent: 1, active: 1 },
        strictPopulate: false,
      });

      if (result) {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateSku(id, sku, data) {
    try {
      const response = await Inventory.updateOne(
        { _id: id, "skus.sku": sku },
        {
          $set: {
            "skus.$": {
              sku: data.newsku,
              price: data.price,
              stock_quantity: data.stock_quantity,
              options: {
                size: data.options.size,
                color: data.options.color,
                img_url: data.options.img_url,
              },
            },
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async updateItem(id, data) {
    try {
      const response = await Inventory.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            item: { name: data.item.name, description: data.item.description },
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async deleteItem(id) {
    try {
      const response = await Inventory.deleteOne({ _id: id });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getItemById(id) {
    try {
      const item = await Inventory.findById(id);

      if (item) {
        return item;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getItemByIdAndSku(id, sku) {
    try {
      const item = await Inventory.findOne({ _id: id, "skus.sku": sku });

      if (item) {
        return item;
      }
    } catch (error) {
      throw error;
    }
  }

  static async decreasePrice(data) {
    try {
      let response;
      let percentage = await data.item.discount_id.discount_percent;
      for (const el of data.skus) {
        const differential = el.price * percentage;
        let newPrice = el.price - differential;
        newPrice = newPrice.toFixed(2);
        //console.log(newPrice);
        response = await Inventory.updateOne(
          { _id: data.id, "skus.sku": el.sku },
          {
            $set: {
              "skus.$.price": newPrice,
            },
          }
        );
      }

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async increasePrice(data) {
    try {
      let response;
      let percentage = data.item.discount_id.discount_percent;

      for (const el of data.skus) {
        const differential = 1 - percentage;

        let newPrice = el.price / differential;
        newPrice = newPrice.toFixed(2);
        response = await Inventory.updateOne(
          { _id: data.id, "skus.sku": el.sku },
          {
            $set: {
              "skus.$.price": newPrice,
            },
          }
        );
      }

      return response;
    } catch (error) {
      throw error;
    }
  }
};

//   static async checkDuplicateSkus(arr) {
//     try {
//       let skus = [];

//       for (let i = 0; i < arr.length; i++) {
//         let sku = arr[i].sku;

//         skus.push(sku);
//       }

//       const allSkus = skus.map((el) => Inventory.find({ "skus.sku": el }));
//       const result = await Promise.all(allSkus);

//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async checkDuplicateCategories(arr) {
//     try {
//       let categories = [];
//       for (let i = 0; i < arr.length; i++) {
//         let category = arr[i].category;

//         categories.push(category);
//       }
//       const allCategories = categories.map((el) =>
//         Inventory.find({ "categories.category": el })
//       );
//       const result = await Promise.all(allCategories);

//       return result;
//     } catch (error) {
//       console.log(error);
//     }
//   }
