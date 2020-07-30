const expess = require('express');
const router = expess.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

const Admin = require('../../models/Admin');
const TokenNumber = require('../../models/TokenNumber');

// @route   POST api/admin
//@desc     Register Admin
//@access   Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please Enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });

      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      admin = new Admin({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      res.send('Admin Registered');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/admin
//@desc     Add TokenNumber
//@access   Private
router.post('/addtoken', auth, async (req, res) => {
  const { token, month } = req.body;
  let tokenNumber = new TokenNumber({
    token,
    month,
  });
  await tokenNumber.save();
  res.json(tokenNumber);
});

module.exports = router;
