const express = require('express');
const router = express.Router();
const {auth,isAdmin } = require('../middleware/auth')
const { createInquiry, getAllInquiries, getInquiryById } = require('../controllers/inquiryController');

router.post('/createInquiry', createInquiry);
router.get('/getAllInquiries',auth,isAdmin, getAllInquiries);
router.get('/getInquiryById/:id',auth,isAdmin, getInquiryById); // e.g. /api/inquiry/1

module.exports = router;
