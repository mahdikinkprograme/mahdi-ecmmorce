const jwt = require("jsonwebtoken");
const generateToken = async (user) => {
  const secretkey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    secretkey
  );
  return token;
};

module.exports = generateToken;
