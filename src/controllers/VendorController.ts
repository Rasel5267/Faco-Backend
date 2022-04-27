import { Request, Response, NextFunction } from "express";
import { EditVendorInputs, VendorLoginInput } from "../dto";
import { GenerateSignature, ValidatePassword } from "../utility";
import { FindVendor } from "./AdminController";

export const VendorLogin = async (req:Request, res: Response, next: NextFunction) => {
	const { email, password } = <VendorLoginInput>req.body;

	const existingVendor = await FindVendor('', email);

	if(existingVendor !== null){
		// validation and give access
		const validation = await ValidatePassword(password, existingVendor.password, existingVendor.salt);

		if(validation){
			const signature = GenerateSignature({
				_id: existingVendor.id,
				email: existingVendor.email,
				foodTypes: existingVendor.foodTypes,
				name: existingVendor.name
			})
			return res.json(signature);
		}else {
			return res.json({ "message": "Password is not valid" });
		}
	}

	return res.json({ "message": "Vendor does not exist with this email ID" });
}

export const GetVendorProfile = async (req:Request, res: Response, next: NextFunction) => {
	const user = req.user;

	if(user){
		const existingVendor = await FindVendor(user._id)
		return res.json(existingVendor)
	}

	return res.json({ "message": "Vendor info not found" })
}

export const UpdateVendorProfile = async (req:Request, res: Response, next: NextFunction) => {
	
	const { name, address, phone, foodTypes } = <EditVendorInputs>req.body;
	const user = req.user;

	if(user){
		const existingVendor = await FindVendor(user._id);

		if(existingVendor !== null){
			existingVendor.name = name;
			existingVendor.address = address;
			existingVendor.phone = phone;
			existingVendor.foodTypes = foodTypes;

			const saveResult = await existingVendor.save();
			return res.json(saveResult);
		}
		return res.json(existingVendor);
	}

	return res.json({ "message": "Vendor info not found" });
}

export const UpdateVendorService = async (req:Request, res: Response, next: NextFunction) => {
	const user = req.user;

	if(user){
		const existingVendor = await FindVendor(user._id);
		
		if(existingVendor !== null){
			existingVendor.serviceAvailable = !existingVendor.serviceAvailable
			const saveResult = await existingVendor.save()
			return res.json(saveResult)
		}
		return res.json(existingVendor);
	}

	return res.json({ "message": "Vendor info not found" });
}