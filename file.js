const expess = require('express');
const router = expess.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('./middleware/auth');

// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const config = require('config');
// const path = require('path');

// const User = require('../../models/User');

// const db = config.get('mongoURI');

// const conn = mongoose.createConnection(db, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });

// // Init gfs
// let gfs;

// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: db,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });
// const upload = multer({ storage });

// // @route   POST api/file
// //@desc     Get report
// //@access   Public
// router.post(
//   '/report',
//   [
//     check('key', 'key is required').exists(),
//     check('password', 'password is required').exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { key, password } = req.body;

//     try {
//       let user = await User.findOne({ key });

//       if (!user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: 'Invalid Credentials' }] });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: 'Invalid Credentials' }] });
//       }

//       if (user.show == false) {
//         return res.status(200).send('Report is not ready yet');
//       }

//       gfs.files.findOne({ filename: user.filename }, (err, file) => {
//         // Check if file
//         if (!file || file.length === 0) {
//           return res.status(404).json({
//             err: 'No file exists',
//           });
//         }

//         // File exists
//         const readstream = gfs.createReadStream(file.filename);
//         readstream.pipe(res);
//         // res.json(file);
//       });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// // @route   POST api/file/upload
// //@desc     Upload File
// //@access   Private
// router.post(
//   '/upload',
//   [auth, [check('key', 'Key is required ').exists()]],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { key } = req.body;
//     try {
//       let user = await User.findOne({ key });

//       if (!user) {
//         return res.status(400).json({ errors: [{ msg: 'Invalid Key' }] });
//       }

//       const up = {};

//       up.show = true;
//       up.filename = req.file.filename;

//       await User.findOneAndUpdate({ key }, { $set: up }, { new: true });
//       upload.single('file');
//       res.status(200).send('File uploded');
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// @route   POST api/file
//@desc     Get report
//@access   Public
router.post(
  '/report',
  [
    check('key', 'key is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { key, password } = req.body;

    try {
      let user = await User.findOne({ key });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      if (user.show == false) {
        return res.status(200).send('Report is not ready yet');
      }

      res.json(user.filename);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/file/upload
//@desc     Upload File
//@access   Private
router.post(
  '/upload',
  [auth, [check('key', 'Key is required ').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { key } = req.body;
    // console.log(key);
    try {
      let user = await User.findOne({ key });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Key' }] });
      }
      // console.log(req.body.key);

      if (user.show === true) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'File Already Uploaded' }] });
      }

      if (req.files === null) {
        return res.status(400).json({ errors: [{ msg: 'No file uploaded' }] });
      }

      const file = req.files.file;
      const filename = Date.now() + '_' + file.name;

      file.mv(`${__dirname}/client/public/uploads/${filename}`, (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send({ errors: [{ msg: 'Error Uploading a File' }] });
        }
        // res.status(200).send({ fileMsg: [{ msg: 'File Uploaded' }] });

        // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
      });

      const up = {};

      up.show = true;
      up.filename = filename;

      await User.findOneAndUpdate({ key }, { $set: up }, { new: true });
      res.send('File Uploaded');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
