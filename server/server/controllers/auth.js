const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generatorToken = (id, baseToken) => {
  return jwt.sign(
    {
      id,
      baseToken
    },
    process.env.SECRET,
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        code: 405,
        message: 'User exist'
      });
    }

    const newUser = await User.create({
      email,
      name,
      password: bcrypt.hashSync(password, 8),
      baseToken: uuidv4()
    });

    if (!newUser) {
      return res.json({
        code: 407,
        message: 'DB error!!!'
      });
    }

    res.json({
      coded: 200,
      message: 'register success!!!',
      data: {
        email: newUser.email,
        name: newUser.name,
        baseToken: newUser.baseToken,
        token: generatorToken(newUser._id, newUser.baseToken)
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const loginEmail = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const compare = bcrypt.compareSync(password, user.password);
    if (compare) {
      return res.json({
        code: 200,
        data: {
          email: user.email,
          name: user.name,
          token: generatorToken(user.id, user.baseToken)
        }
      });
    }
    return res.json({
      code: 404,
      message: 'Invalid password!!!'
    });
  }
  return res.json({
    code: 404,
    message: 'User not found!!!'
  });
};

module.exports = { register, loginEmail };
