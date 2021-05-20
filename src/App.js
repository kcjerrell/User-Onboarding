import { useEffect, useState } from 'react';
import './App.css';
import Form from './Form';
import * as yup from 'yup';
import schema from './formSchema';
import axios from 'axios';

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
    const newUser = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      tosAgreement: formData.tosAgreement
    };
    axios.post('https://reqres.in/api/users', newUser)
      .then(response => {
        console.log(response);
        setUsers([...users, response.data]);
      })
      .catch(reason => console.log(reason));
  };

  return (
    <div className="App">
      <header className="App-header">
        User Onboarding
      </header>
      <Form formData={formData} formErrors={formErrors} submitDisabled={submitDisabled} change={inputChange} submit={formSubmit} />

      {users.length > 0 &&
        <table name='usersTable'>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>password</th>
              <th>tosAgreement</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td >{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>**********</td>
                  <td>{user.tosAgreement ? "true" : "false"}</td>
                </tr>
              );
            })}
          </tbody>

        </table>
      }
    </div>
  );
}

export default App;
