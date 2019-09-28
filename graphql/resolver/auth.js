// import event from models folder to parsing event input data
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  // create user
  createUser: async args => {
    try {
      const userExist = await User.findOne({ email: args.userInput.email });
      if (userExist) {
        {
          throw new Error("user already exixst");
        }
      }
      const hashedPasword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPasword
      });
      const result = await user.save();
      console.log(result);
      return { ...result._doc, _id: result.id, password: null };
    } catch (err) {
      throw err;
    }
  }
};
