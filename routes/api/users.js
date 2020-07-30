const expess = require('express');
const router = expess.Router();
var generator = require('generate-password');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const Token = require('../../models/TokenNumber');

// @route   POST api/user
//@desc     Create a user
//@access   private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('mobileNo', 'Mobile Number is required').not().isEmpty(),
      check('age', 'Age is required').not().isEmpty(),
      check('sex', 'Sex is required').not().isEmpty(),
      check('totalBill', 'Total Bill is required').not().isEmpty(),
      check('tests', 'Test is required').not().isEmpty(),
      check('amountPaid', 'Amount Paid is required').not().isEmpty(),
      check('amountRemaining', 'Amount Remaining is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      mobileNo,
      age,
      sex,
      totalBill,
      tests,
      discount,
      referedBy,
      amountPaid,
      amountRemaining,
    } = req.body;

    var password = generator.generate({
      length: 8,
      numbers: true,
    });

    try {
      //genrate Key
      let token = await Token.find().limit(1);

      const a = {};
      a.token = token[0].token;
      a.month = token[0].month;

      let d = new Date();
      let m = d.getMonth() + 1;

      if (a.month != m) {
        a.token = 0;
        a.month = m;
      }
      a.token = a.token + 1;

      let key =
        a.token + '' + d.getFullYear() + '' + d.getMonth() + '' + d.getDate();
      token = await Token.findOneAndUpdate(
        { id: token.id },
        { $set: a },
        { new: true }
      );

      let user = new User({
        name,
        mobileNo,
        age,
        sex,
        totalBill,
        tests,
        key,
        password,
        discount,
        referedBy,
        amountPaid,
        amountRemaining,
      });

      console.log(password);
      console.log(key);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log(user);
      // res.send('user Added' + ' Key = ' + key + ' password = ' + password);
      res.send({ key, password });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
