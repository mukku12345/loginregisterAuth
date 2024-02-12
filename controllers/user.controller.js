const db = require ('../models');
const bcrypt = require ('bcrypt');
const crypto = require ('crypto');
const jwt = require ('jsonwebtoken');
const Joi = require ('joi');
const {OAuth2Client} = require ('google-auth-library');
const client = new OAuth2Client ();
const {invalidateToken} = require ('../middleware/authMiddleware');
const User = db.auth.User;

exports.registerUser = async (req, res) => {
  try {
    const userSignupSchema = Joi.object ({
      name: Joi.string ().required (),
      email: Joi.string ().email ().required (),
      password: Joi.string ().min (8).max (30).required (),
    });

    const {error, value} = userSignupSchema.validate (req.body);

    if (error) {
      return res.status (400).json ({
        message: error.details[0].message,
      });
    }

    const {name, email, password} = value;

    const existingUser = await User.findOne ({email: email});

    if (existingUser) {
      return res.status (409).send ({
        message: 'This user is already in use!',
      });
    } else {
      const hashedPassword = await bcrypt.hash (password, 10);

      const newUser = new User ({name, email, password: hashedPassword});

      await newUser.save ();

      const token = jwt.sign ({userId: newUser._id}, 'SECRET_JWT_CODE');

      newUser.token = token;
      await newUser.save ();

      res.status (200).json ({
        status_code: '200',
        message: 'User Registered Successfully',
        data: {
          name: newUser.name,
          email: newUser.email,
          status: newUser.status,
          password: newUser.password,
          // token: token,
        },
      });
    }
  } catch (error) {
    res.status (500).json ({
      message: error.message || 'Some error occurred while creating the user.',
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const logInSchema = Joi.object ({
      email: Joi.string ().email ().required (),
      password: Joi.string ().min (8).max (30).required (),
    });

    const {err, value} = logInSchema.validate (req.body);

    if (err) {
      return res.status (400).json ({
        message: err.details[0].message,
      });
    }

    const {email, password} = value;

    const existingUser = await User.findOne ({email: email});

    if (!existingUser) {
      return res.status (401).json ({message: 'Unregisterd Email'});
    }
    const passwordMatch = await bcrypt.compare (
      password,
      existingUser.password
    );

    if (!passwordMatch) {
      return res.status (401).json ({message: 'Invalid Password !'});
    }

    const token = jwt.sign ({userId: existingUser._id}, 'test', {
      expiresIn: '24h',
    });

    existingUser.token = token;
    await existingUser.save ();

    res.status (200).json ({token});
  } catch (error) {
    res.status (500).json ({
      message: error.message || 'Some error occurred while creating the user.',
    });
  }
};

exports.signOut = async (req, res) => {
  try {
    
  } catch (error) {
    console.log ('error', error);
    res.status (500).json ({
      message: err.message || 'Some error has occurred while getting userList',
    });
  }
};

exports.getUserList = async (req, res) => {
  try {
    const users = await User.find ();
    if (users.length > 0) res.status (200).json ({users});
    else res.status (401).json ({message: 'data not found'});
  } catch (err) {
    res.status (500).json ({
      message: err.message || 'Some error has occurred while getting userList',
    });
  }
};

exports.loadAuth = (req, res) => {
  res.render ('auth');
};

exports.successGoogleLogin = (req, res) => {
  if (!req.user) res.redirect ('/failure');
  console.log (req.user);
  res.send ('Welcome ' + req.user.email);
};

exports.failureGoogleLogin = (req, res) => {
  res.send ('Error');
};
