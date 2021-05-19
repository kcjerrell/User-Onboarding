import React, { useState } from "react";
import styled from 'styled-components';

const StyledForm = styled.form`
display: flex;
flex-direction: column;
`;

const Form = props => {
	const { formData, formErrors, change, submit, submitDisabled } = props;

	const onChange = e => {
		const { name, value, checked, type } = e.target;
		const valueToUse = type === "checkbox" ? checked : value;
		change(name, valueToUse);
	};

	return (
		<StyledForm submit={submit}>
			<label>Name
				<input type="text" name="name" value={formData.name} onChange={onChange} />
			</label>
			<label>Email
				<input type="email" name="email" value={formData.email} onChange={onChange} />
			</label>
			<label>Password
				<input type="password" name="password" value={formData.password} onChange={onChange} />
			</label>
			<label>Agree to Terms of Service
				<input type="checkbox" name="tosAgreement" checked={formData.tosAgreement} onChange={onChange} />
			</label>
			<button disabled={submitDisabled}>Submit</button>
			<div>
				<div>{formErrors.name}</div>
				<div>{formErrors.email}</div>
				<div>{formErrors.password}</div>
				<div>{formErrors.tosAgreement}</div>
			</div>
		</StyledForm>
	)
};

export default Form;