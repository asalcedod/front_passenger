import React, { useState, useEffect } from "react";
import Maps from "./../../dinamic/Maps";
import Cookies from "universal-cookie";
import { Status } from "./../../dinamic/Status";
import LoadingOverlay from "react-loading-overlay";
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
} from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import credentials from "../../../credentials";

const FormModal = ({
  modalTitle,
  colorButton,
  icon,
  controller,
  petitionType,
  inputs,
  dataList,
}) => {
  let baseUrl = process.env.REACT_APP_API_LOCAL;
  switch (process.env.NODE_ENV) {
    case "development":
      baseUrl = process.env.REACT_APP_API_DEV;
      break;
    case "production":
      baseUrl = process.env.REACT_APP_API_PRODUCTION;
      break;

    default:
      break;
  }
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({
    ...dataList,
    passenger: cookies.get("form")._id,
    init_position: cookies.get("form").position,
  });
  const [children, setChildren] = useState(
    inputs[inputs.length - 1].children
      ? inputs[inputs.length - 1].children
      : null
  );

  const toggle = () => setShow(!show);

  const petitions = async (petition, controller) => {
    switch (petition) {
      case "post":
        return await axios
          .post(controller, form)
          .then(() => {
            setLoading(true);
            setShow(!show);
            setForm({
              ...dataList,
              passenger: cookies.get("form")._id,
              init_position: cookies.get("form").position,
            });
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      case "put":
        return await axios
          .put(controller + "/" + form._id, form)
          .then(() => {
            setLoading(true);
            setShow(!show);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      default:
        break;
    }
  };

  const renderStatus = () => {
    return Status.map((val) => {
      return <option value={val.value}>{val.name}</option>;
    });
  };

  const typeInputs = (value) => {
    switch (value.type) {
      case "select":
        return (
          <Input
            onChange={handleChange}
            defaultValue={form[value.id] ? form[value.id] : "DEFAULT"}
            key={value.id}
            type={value.type}
            name={value.name}
            id={value.id}
          >
            <option value="DEFAULT" disabled>{`Choose a option...`}</option>
            {value.id !== "status" ? children[value.id] : renderStatus()}
          </Input>
        );
      case "file":
        return (
          <div>
            <Input
              key={value.id}
              onChange={handleChange}
              type={value.type}
              name={value.name}
              id={value.id}
              value={""}
            />
            {form[value.id] ? (
              <img src={form[value.id]} width="100%" height="100%" />
            ) : null}
          </div>
        );

      case "position":
        return (
          <div>
            <Maps
              position={form[value.id]}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        );
      default:
        return value.type !== "password" ? (
          <Input
            key={value.id}
            onChange={handleChange}
            type={value.type}
            name={value.name}
            id={value.id}
            value={form[value.id] ? form[value.id] : ""}
          />
        ) : (
          <Input
            key={value.id}
            onChange={handleChange}
            type={value.type}
            name={value.name}
            id={value.id}
          />
        );
    }
  };

  const renderInputs = (inputs) => {
    const renderInput = (value) => {
      return (
        <FormGroup key={`${value.id}-${value.name}`}>
          <Label for={value.id}>{value.name}</Label>
          {typeInputs(value)}
        </FormGroup>
      );
    };
    return inputs.map(renderInput);
  };

  useEffect(() => {
    inputs.map((value) => {
      if (value.type === "select") {
        if (value.id !== "status") {
          renderSelect(value);
        }
      }
    });
  }, []);

  const renderSelect = async (value) => {
    const { id } = value;
    return await axios
      .get(baseUrl + value.foreign.controller)
      .then((response) => {
        setLoading(true);
        // if (value.id === 'customerID') {
        setChildren({
          ...children,
          [id]: response.data.data.map((val) => {
            return <option value={val.id}>{val.name}</option>;
          }),
        });

        // }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  return (
    <Container>
      <Button color={colorButton} size="sm" onClick={toggle}>
        <FontAwesomeIcon icon={icon} />
      </Button>

      <LoadingOverlay active={isLoading} spinner>
        <Modal isOpen={show} toggle={toggle}>
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>
            <Form>
              {renderInputs(
                inputs.filter(function (value, index, arr) {
                  return value.form;
                }),
                dataList
              )}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              variant="secondary"
              onClick={() => petitions(petitionType, controller)}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </LoadingOverlay>
    </Container>
  );
};

FormModal.propTypes = {
  colorButton: PropTypes.string,
  dataList: PropTypes.object,
};

FormModal.defaultProps = {
  icon: faPlus,
  colorButton: "primary",
  dataList: {},
};

export default FormModal;
