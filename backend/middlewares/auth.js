const { getUser } = require("../Services/auth");

async function restrictToLoggedInUsersOnly(req, res, next) {
  const userId = req.cookies?.uId;

  if (!userId) {
    return res.redirect("/login");
  }

  const user = getUser(userId);

  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUsersOnly };
