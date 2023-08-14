const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { data, signature } = req.body;
  console.log('=========> message from bank', `${data}, ===>>>> ${signature}`);
  try {
    res.send({
      status: 'Upload was successful',
      result: req.body,
      ressulTwo: {
        data,
        signature,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { paymentRoutes: router };
