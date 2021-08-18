import React, { useState, useEffect } from 'react'
import env from "react-dotenv";
import LoadingOverlay from 'react-loading-overlay';
import md5 from "md5";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from 'reactstrap'
import axios from 'axios'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

const RegisterModal = ({ }) => {
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
  const [show, setShow] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [form, setForm] = useState({});
  const [rol, setRol] = useState({});

  const toggle = () => setShow(!show)

  const petitions = async () => {
    return await axios.post(baseUrl + "user", form)
      .then(() => {
        setLoading(true)
        setShow(!show)
        setLoading(false)
      }).catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  useEffect(() => {
    renderRols()
  },[])

  const renderRols = async () => {
    return await axios.get(baseUrl + 'rols')
      .then(response => {
        setLoading(true)
        setRol({
          ...rol,
          option: response.data.data.map((val) => {
            return <option value={val._id}>{val.name}</option>
          })
        })
        setLoading(false)
      }).catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  const handleChange = e => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value
    })
    if (id === "password") {
      setForm({
        ...form,
        [id]: md5(value),
      });
    }
  };

  return (
    <div className="submit-button-container">
      <Button onClick={toggle} className='register'>
        Register
      </Button>

      <LoadingOverlay
        active={isLoading}
        spinner
      >
        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader toggle={toggle}>Register User</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Identification</Label>
                <Input
                  key="identification"
                  onChange={handleChange}
                  type="text"
                  name="identification"
                  id="identification"
                  placeholder="Identification"
                />
                <Label>User</Label>
                <Input
                  key="username"
                  onChange={handleChange}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="User"
                />
                <Label>Email</Label>
                <Input
                  key="email"
                  onChange={handleChange}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                />
                <Label>Name</Label>
                <Input
                  key="name"
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                />
                <Label>Password</Label>
                <Input
                  key="password"
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <Label>Rol</Label>
                <Input
                  onChange={handleChange}
                  defaultValue={form.option ? form.option : "DEFAULT"}
                  key="rol"
                  type="select"
                  name="rol"
                  id="rol"
                >
                  <option value="DEFAULT" disabled>{`Choose a option...`}</option>
                  {rol.option}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='success' variant="secondary" onClick={() => petitions()}>
              Save
          </Button>
          </ModalFooter>
        </Modal>
      </LoadingOverlay>

    </div>
  )
}

RegisterModal.propTypes = {
  colorButton: PropTypes.string,
  dataList: PropTypes.object
}

RegisterModal.defaultProps = {
  icon: faPlus,
  colorButton: "primary",
  dataList: {}
}

export default RegisterModal
