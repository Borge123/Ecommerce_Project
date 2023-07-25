module.exports = {
  sessionChecker: async (req, res, next) => {
    console.log(`Session Checker: ${req.session.id}`);
    console.log(req.session.id);
    if (req.session.cart) {
      console.log(`Found  cart`);
      next();
    } else {
      console.log(`No cart Found`);
      return res.status(400).json({ "Session": "No cart session found" });
    }
  },
};
