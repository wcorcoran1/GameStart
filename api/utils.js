// This function makes it to where you have to be login to use it.
function loginAuth(req, res, next) {

  if (!req.user) {
    
    res.status(401)
    next({
      name: "Login",
      message: "Need to Login",
    });
  }
  next();
}

module.exports = {
  loginAuth,
};
