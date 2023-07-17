module.exports = {
  sessionChecker: async (req, res, next) => {
    console.log(`Session Checker: ${req.session.id}`);
    console.log(req.session.id);
    if (req.session.cart) {
      console.log(`Found User Session`);
      next();
    } else {
      console.log(`No User Session Found`);
      res.send("No User session found");
    }
  },
};
