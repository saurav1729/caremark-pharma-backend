const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    console.log(req.body)
  const token =
    req.body.token ||
    req.cookies.token ||
    (req.headers["authorization"] &&
      req.headers["authorization"].replace("Bearer ", ""));

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if(req.user){
        console.log(`${req.user.name} logged in successfully`)
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req?.user?.role != "ADMIN") {
      res.status(401).json({
        success: false,
        message: "this is protected route for Admin",
      });
    }
        console.log(req.user.role);
  

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success: false,
      message: "this is protected route for Admin",
    });
  }
};

module.exports = { auth, isAdmin };
