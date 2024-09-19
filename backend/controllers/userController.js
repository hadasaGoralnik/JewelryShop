const User = require('../models/userModel');

// User Registration
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'שם המשתמש כבר קיים במערכת ' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    
    res.status(201).json({ message: 'ההרשמה בוצע בהצלחה ' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration error' });
  }
};


// User Login
exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'שם משתמש או סיסמה לא חוקיים' });
    }

    res.status(200).json({ message: 'הכניסה בוצע בהצלחה !!!', name });
  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
};

// Delete User
exports.delete = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await User.deleteOne({ name });

    if (result.deletedCount === 0) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

