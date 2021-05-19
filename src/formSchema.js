import * as yup from 'yup';

const formSchema = yup.object().shape({
	name: yup.string().trim()
		.required("Name is required")
		.min(3, "Name must be at least 3 characters long")
		.max(50, "Name cannot exceed 50 characters"),
	email: yup.string().trim()
		.required("Email is required")
		.email("Must enter valid email address"),
	password: yup.string().trim()
		.min(8, "Password must be at least 8 characters long")
		.max(50, "Password cannot exceed 50 characters")
		.required("Password is required"),
	tosAgreement: yup.boolean().required().isTrue("User must agree to Terms of Service"),
});

export default formSchema