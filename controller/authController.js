const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user")

// Register User
const registerUser = async (req, res) => {
    console.log(req.body); 
  try {
    const { name, email, password, role } = req.body;
    if(!name || !email ||!password ||!role){
        return res.status(400).json(
            {
                success:false, 
                message: "All fields are required"
            }
        ) 
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json(
            {
                success:false, 
                message: "Already registered with this email"
            }
        )
    }
    let hashedPassword; 
    try{
    const salt = await bcrypt.genSalt(10);
     hashedPassword = await bcrypt.hash(password, salt);
    }catch(err){
        console.log(err);
        res.status(400).json({
          success:false, 
           message: "error in hashing password"
        })
    }
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'USER',
    });

    await user.save();
    

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Cookie expires in 3 days
        httpOnly: true, 
    };

    res.cookie("token",token,options).status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        img: user.photoURL,
      },
    });
  } catch (error) {
    console.log(error); n
    res.status(500).json({ message: 'Server error' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    if(!email ||!password){
        return res.status(400).json({
            success:false, 
            message: "All fields are required"
        })
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success:false,  message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success:false,  message: 'Invalid credentials' });
    }

    

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      token,
      user: {
        name: user.name,
        img: user.photoURL,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = { registerUser, loginUser };
