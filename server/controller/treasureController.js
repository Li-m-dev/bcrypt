
const dragonTreasure = async (req, res) => {
  const db = req.app.get('db');
  const treasure = await db.get_dragon_treasure(1);
  return res.status(200).json(treasure);
}
const getUserTreasure = async (req, res) => {
  const db = req.app.get('db');
  const userTreasure = await db.get_user_treasure([req.session.user.id]);
  return res.status(200).json(userTreasure);
}
const addUserTreasure = async (req, res) => {
  const {treasureURL} = req.body;
  // console.log('req.body: ', req.body);
  const {id} = req.session.user;
  const db = req.app.get('db');
  const userTreasure = await db.add_user_treasure([treasureURL, id]);
  return res.status(200).json(userTreasure);
}
const getAllTreasure = async (req, res) => {
  const allTreasure = await req.app.get('db').get_all_treasure();
  return res.status(200).json(allTreasure);
}


module.exports = {
  dragonTreasure,
  getUserTreasure,
  addUserTreasure,
  getAllTreasure
}