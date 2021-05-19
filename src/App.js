import { useEffect, useState } from 'react';
import './App.css';
import Form from './Form';
import * as yup from 'yup';
import schema from './formSchema';

const initialUsers = [];
const initialFormData = {
  name: '',
  email: '',
  password: '',
  tosAgreement: false,
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  tosAgreement: '',
}
const initialSubmitDisabled = true;

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [submitDisabled, setSubmitDisabled] = useState(initialSubmitDisabled);

  useEffect(() => {
    schema.isValid(formData).then(valid => setSubmitDisabled(!valid));
  }, [formData])

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch((error) => setFormErrors({ ...formErrors, [name]: error.errors[0] }));
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormData({
      ...formData,
      [name]: value,
    })
  };

  const formSubmit = e => {

  };

  return (
    <div className="App">
      <header className="App-header">
        User Onboarding
      </header>
      <Form formData={formData} formErrors={formErrors} submitDisabled={submitDisabled} change={inputChange} submit={formSubmit} />
    </div>
  );
}

export default App;
