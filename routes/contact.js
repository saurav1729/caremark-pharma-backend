const express = require('express');
const router = express.Router();

const { submitContactForm, getAllcontacts } = require('../controller/contact');

router.route('/').post(submitContactForm);
router.get('/getContactInfo', getAllcontacts)

module.exports = router;

