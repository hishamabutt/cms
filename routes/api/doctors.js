const expess = require('express');
const router = expess.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Doctors = require('../../models/Doctors');

// @route   GET api/doctor
//@desc     Get all Doctors
//@access   private
router.get('/', auth, async (req, res) => {
  const doctors = await Doctors.find();
  res.json(doctors);
});

// @route   POST api/doctor
//@desc     Create a Doctors
//@access   private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name } = req.body;
    try {
      name = name.toLowerCase();

      let doctor = await Doctors.findOne({ name });

      if (doctor) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Doctor with same name already exists' }] });
      }

      doctor = new Doctors({
        name,
      });

      await doctor.save();

      res.send('Doctor Added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
