const expess = require('express');
const router = expess.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const TestDetail = require('../../models/TestDetails');

// @route   GET api/test
//@desc     Get all Tests
//@access   private
router.get('/', auth, async (req, res) => {
  const tests = await TestDetail.find();
  res.json(tests);
});

// @route   POST api/test
//@desc     Create a Test
//@access   private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('price', 'Price is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, price } = req.body;
    try {
      name = name.toLowerCase();
      let test = await TestDetail.findOne({ name });

      if (test) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Test already exists' }] });
      }

      test = new TestDetail({
        name,
        price,
      });

      await test.save();

      res.send('Test Details Added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/test
//@desc     edit a test
//@access   private
router.post(
  '/edittest',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('price', 'Price is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { _id, name, price } = req.body;
    try {
      name = name.toLowerCase();
      let test = await TestDetail.findOne({ _id });

      if (!test) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Test Does not Exits' }] });
      }

      let test1 = await TestDetail.findOne({ name });
      if (test1) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Test with this name already exists' }] });
      }

      test.name = name;
      test.price = price;

      await test.save();

      res.send('Test Details Updated');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
