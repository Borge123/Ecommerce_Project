module.exports = {
  calcTotal: async (arr) => {
    try {
      const total = arr.reduce(
        (acc, currentVal) => acc + currentVal.price * currentVal.quantity,
        0
      );
      return total;
    } catch (error) {
      throw error;
    }
  },
};
