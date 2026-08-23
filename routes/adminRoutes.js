const express = require('express');

const router = express.Router();

const adminController =
    require('../controllers/adminController');

const authMiddleware =
    require('../middlewares/authMiddleware');


router.get(
    '/admin',
    authMiddleware.somenteAdmin,
    adminController.dashboard
);


module.exports = router;