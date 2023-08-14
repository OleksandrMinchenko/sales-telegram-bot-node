const express = require('express');
const router = express.Router();

router.post('/liqpay', async (req, res, next) => {
  try {
    res.send({
      status: 'Upload was successful',
      result: req.body,
    });
  } catch (error) {
    next(error);
  }
});



module.exports = { paymentRoutes: router };
