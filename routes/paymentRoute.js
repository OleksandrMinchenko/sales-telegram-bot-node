const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { data, signature } = req.body;
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
