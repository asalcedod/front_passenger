import React from "react";
import Cookies from "universal-cookie";
import { Table, Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import FormModal from "./../Forms/FormModal";
import { TravelModel } from "./../TravelModel";
import { getKilometros } from "../../../util/distances";
import axios from "axios";
import PropTypes from "prop-types";
import { enviroment } from "./../../../util/enviroment";

import "./table.css";

const CRUD = ({ title, data, baseUrl }) => {
  const baseTravel = enviroment();
  const cookies = new Cookies();

  const peticionDelete = async (data) => {
    await axios
      .delete(baseUrl + "/" + data._id)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const renderTableTittle = (header) => {
    const renderTittle = (data) =>
      data.grid ? <th key={data.id}>{data.name}</th> : null;
    return header.map(renderTittle);
  };

  const renderData = (headerText, dataList) => {
    const renderUser = (data) => {
      const renderHeader = (key) => {
        if (key.grid) {
          if (key.id === "actions") {
            return (
              <td key={`${data[key.id]}-${key.id}`}>
                <ButtonGroup size="sm">
                  <FormModal
                    modalTitle="Go Travel"
                    colorButton="primary"
                    icon={faEdit}
                    controller={baseTravel + "travel"}
                    petitionType="post"
                    inputs={TravelModel}
                    dataList={{driver: data._id}}
                  />
                </ButtonGroup>
              </td>
            );
          }
          if (key.id === "status") {
            if (data[key.id] == 1) {
              return <td key={`${data[key.id]}-${key.id}`}>Active</td>;
            }
            if (data[key.id] == 0) {
              return <td key={`${data[key.id]}-${key.id}`}>Inactive</td>;
            } else {
              return <td key={`${data[key.id]}-${key.id}`}>N/A</td>;
            }
          } else {
            if (key.type === "password") {
              return <td key={`${data[key.id]}-${key.id}`}>*******</td>;
            } else {
              return (
                <td key={`${data[key.id]}-${key.id}`}>
                  {key.id === "price" ? " Aprox $ " : ""}
                  {data[key.id]}
                  {key.id === "price" ? (
                    <>
                      <br />
                      (El valor varia segun el tiempo del viaje)
                    </>
                  ) : (
                    ""
                  )}
                </td>
              );
            }
          }
        }
      };
      return <tr>{headerText.map(renderHeader)}</tr>;
    };
    return dataList.map(renderUser);
  };

  return (
    <div>
      <Table dark bordered>
        <thead>
          <tr>{renderTableTittle(title)}</tr>
        </thead>
        <tbody>{renderData(title, data)}</tbody>
      </Table>
    </div>
  );
};

CRUD.propTypes = {
  title: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  baseUrl: PropTypes.string,
  actions: PropTypes.array,
};

export default CRUD;
