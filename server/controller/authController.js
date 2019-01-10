const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const{username, password, isAdmin} = req.body;
  const db = req.app.get('db');
  const result = await db.get_user([username]);
  console.log('result: ', result);
  const existingUser = result[0];
  if(existingUser) {
    return res.status(409).json("Username taken")
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const registerUser = await db.register_user([isAdmin, username, hash]);
  // console.log('registerUser: ', registerUser);
  const user = registerUser[0];
  req.session.user = {
    isAdmin: user.is_admin,
    id: user.id,
    username: user.username
  };
  // console.log('req.sesson: ', req.session)
  res.status(201).json(req.session.user);
}

const login = async (req, res) => {
  // console.log('req.body: ', req.body);
  const {username, password} = req.body;
  const db = req.app.get('db');
  const foundUser = await db.get_user([username]);
  const user = foundUser[0];
  
  if(!user) {
    return res.status(401).json('User not found. Please register as a new user before logging in.')
  }
  const isAuthenticated = bcrypt.compareSync(password, user.hash);
  if(!isAuthenticated) {
    return res.status(403).json('Incorrect password');
  }
  req.session.user = {
    isAdmin: user.is_admin,
    id: user.id,
    username: user.username
  }
  res.status(200).json(req.session.user);
}
const logout = async (req, res) => {
  req.session.destroy();
  res.status(200).json('OK');
}

module.exports = {
  register,
  login,
  logout
};