import express from 'express';
import { CustomerLogin, CustomerSignup, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOTP } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

// Signup
router.post('/signup', CustomerSignup);
// Login
router.post('/login', CustomerLogin);

// Authentication
router.use(Authenticate);
// Verify Customer
router.patch('/verify', CustomerVerify);
// OTP / Requesting OTP
router.get('/otp', RequestOTP);
// Profile
router.get('/profile', GetCustomerProfile);

router.patch('/profile', EditCustomerProfile);


// cart

// Order

// Payment


export { router as CustomerRoute};