const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const rejectNonAdminUnauthenticated = (req, res, next) => {
  // check if logged in and if
  console.log("checking non admin auth, req.user is", req.user);
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated, rejectNonAdminUnauthenticated };
