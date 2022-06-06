import { IsEmail, IsEmpty, Length } from 'class-validator';

export class CreateCustomerInputs {
	@IsEmail()
	email: string;

	@Length(7, 13)
	phone: string;

	@Length(6, 12)
	password: string;
}

export interface CustomerPayload {
	_id: string;
	email: string;
	verified: boolean
}