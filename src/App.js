import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {
  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"});
  const [validationStates, setValidationStates] = useState({emailState: true, passwordState: false});

  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePasswordFormat = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = ((e) => {
    const newPassword = e.target.value;
    const isValidPassword = validatePasswordFormat(newPassword); //Valida la contraseña y retorna valido o invalido
    if(isValidPassword) {
      console.log("Valid password");
    }
    else {
      console.log("Invalid password");
    }
    setFormValues({...formValues, password: newPassword});
    setValidationStates({...validationStates, passwordState: isValidPassword});
  }
    
);
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const clickSubmit = (() => {
    if (!validateEmailFormat(formValues.email)) {
        setValidationStates({...validationStates, emailState: true});
        return; // Evita que se envíe el formulario
    }
    setValidationStates({...validationStates, emailState: false}); //Verifica el estado de todo y si está bien borra los errores
    alert(JSON.stringify(formValues)); 

      
  });
  
  
  return (
    <div>
      <h1>Ejemplo de formularios!</h1>

      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
              type="email" 
              placeholder="Enter email" //Texto que aparece en el input
              onChange={handleEmailChange} //Si cambia se ejecuta la función de handleEmailChange
              value={formValues.email} 
              isInvalid={validationStates.emailState} //Checkea si hay errores
          />
          {validationStates.emailState && (
              <Form.Text className="text-danger">
                  Your email should follow an established format.
              </Form.Text>
          )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" 
        placeholder="Password" 
        onChange={handlePasswordChange} 
        value={formValues.password} />
        { !validationStates.passwordState ? 
        <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>
        : <Form.Text className="text">Thats a valid password!!!</Form.Text>

        }
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;