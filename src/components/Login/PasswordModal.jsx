import React, { useState, useEffect } from 'react'
import env from "react-dotenv";
import axios from 'axios'
import './login.css';
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from 'reactstrap'
import md5 from 'md5';
import emailjs from 'emailjs-com'
import 'bootstrap/dist/css/bootstrap.css'

const PasswordModal = ({ userLogin }) => {
  let baseUrl = process.env.REACT_APP_API_LOCAL
  switch (process.env.NODE_ENV) {
    case "development":
      baseUrl = process.env.REACT_APP_API_DEV
      break;
    case "production":
      baseUrl = process.env.REACT_APP_API_PRODUCTION
      break;

    default:
      break;
  }
  const frmContact = {id: "", email: "", restorePassword: "" + Math.floor(Math.random() * 100000000) + 1000000};
  const [show, setShow] = useState(false)
  const [user, setUser] = useState(userLogin);
  const [form, setForm] = useState(frmContact);

  const toggle = () => setShow(!show)

  useEffect(() => {
    if (userLogin) {
      setForm({
        ...form,
        id: userLogin.id,
        email: userLogin.email,
      })
      setUser({
        ...user,
        password: md5(frmContact.restorePassword)
      })
    }
  }, [])

  const handleChange = e => {
    const { id, value } = e.target
    setForm({
      ...form,
      [id]: value
    })
  };

  const recoverPassword = async (formPassword) => {
    return await axios.put(baseUrl + "users/" + formPassword.id, formPassword)
      .catch(error => {
        console.log(error)
      })
  }

  const handleSubmit = e => {
    if (form.email === form.confirmEmail) {
      recoverPassword(user)
      e.preventDefault();

      emailjs.send('service_wegquwy', 'template_qqk7g8c', form, 'user_00TS9lgnif7eqRleuVzYf')
        .then(() => {
          setForm(frmContact)
          toggle()
        }, (err) => {
          console.log('FAILED...', err);
        });
    } else {
      alert("No same email")
    }
  }

  const emailSubstring = (email) => {
    const emailArray = email.split("@")
    if (emailArray[0].length < 6) {
      return "***" + emailArray[0].substring(2, emailArray[0].length) + "@" + emailArray[1]
    } else {
      return "***" + emailArray[0].substring(3, emailArray[0].length - 3) + "***@" + emailArray[1]
    }
  }

  return (
    <div>
      <div class="row submit-button-container">
        <div class="col mr-4 d-flex justify-content-center">
          <a href="#" class="stretched-link" onClick={toggle}>
            Forgot your password
          </a>
        </div>
      </div>

      <Form>
        <FormGroup>
          <Modal isOpen={show} toggle={toggle}>
            <ModalHeader toggle={toggle}>Recover Password</ModalHeader>
            <ModalBody>
              <Label>{emailSubstring(form.email)}</Label>
              <div>
                <i class={"fa fa-envelope form-control-feedback"}></i>
                <Input
                  onChange={handleChange}
                  type="email"
                  name="confirmEmail"
                  id="confirmEmail"
                  value={form ? form.name : ''}
                  placeholder="Confirm your email"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className='submit-button-container'>
                <Button
                  color="primary"
                  variant="secondary"
                  onClick={handleSubmit}
                >
                  Send
                    </Button>
              </div>
            </ModalFooter>
          </Modal>
        </FormGroup>
      </Form>
    </div>
  )
}

export default PasswordModal
