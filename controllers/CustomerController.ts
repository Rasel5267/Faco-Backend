import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { CreateCustomerInputs } from "../dto";
import { validate } from "class-validator";
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP } from "../utility";
import { Customer } from "../models";


export const CustomerSignup = async(req: Request, res: Response, next: NextFunction) => {
	const customerInputs = plainToClass(CreateCustomerInputs, req.body);

	const inputErrors = await validate(customerInputs, { validationError: { target: true }})

	if(inputErrors.length > 0){
		return res.status(400).json(inputErrors)
	}

	const { email, phone, password } = customerInputs;

	const salt = await GenerateSalt();
	const userPassword = await GeneratePassword(password, salt);

	const { otp, expiry } = GenerateOtp();

	const existCustomer = await Customer.findOne({ email: email })

	if(existCustomer !== null){
		return res.status(400).json({message: 'An user exist with this email ID'})
	}
	
	const result = await Customer.create({
		email: email,
		password: userPassword,
		salt: salt,
		phone: phone,
		otp: otp,
		otp_expiry: expiry,
		firstName: '',
		lastName: '',
		address: '',
		verified: false,
		lat: 0,
		lng: 0
	})

	if(result){
		// send the otp to customer
		await onRequestOTP(otp, phone)

		// generate signature
		const signature = GenerateSignature({
			_id: result._id,
			email: result.email,
			verified: result.verified
		})

		return res.status(200).json({ signature: signature, verified: result.verified, email: result.email})
	}

	return res.status(400).json({ message: "Fail to Signup"})
}

export const CustomerLogin = async(req: Request, res: Response, next: NextFunction) => {

}

export const CustomerVerify = async(req: Request, res: Response, next: NextFunction) => {

}

export const RequestOTP = async(req: Request, res: Response, next: NextFunction) => {

}

export const GetCustomerProfile = async(req: Request, res: Response, next: NextFunction) => {

}

export const EditCustomerProfile = async(req: Request, res: Response, next: NextFunction) => {

}