//this middleware ensure that the endpoint that requires the user to be logged in
// instead of getting an error in the console, out server will respond to the request with an error.
const usersOnly = (req, res, next) => {
  if(!req.session.user) {
    return res.status(401).json('Please log in');
  }
  next();
}
const adminsOnly = (req, res, next) => {
  if(!req.session.user.isAdmin) {
    return res.status(403).json('You are not an admin')
  }
  next();
}

module.exports = {
  usersOnly,
  adminsOnly
}