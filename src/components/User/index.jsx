import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { UserModel } from "./UserModel";
import Maps from "./../dinamic/Maps";
import NavMenu from "./../NavMenu";
import md5 from "md5";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "universal-cookie";
import { enviroment } from "./../../util/enviroment";
import ProgressBar from "../dinamic/ProgressBar";
import axios from "axios";
import "./user.css";
import { Container } from "reactstrap";
import credentials from "../../credentials";

const User = (props) => {
  const baseUrl = enviroment();
  const cookies = new Cookies();
  const usr = cookies.get("form");
  const [location, setLocation] = useState({
    loaded: false,
    position: {
      lat: "",
      lng: "",
    },
  });
  const [user, setUser] = useState(usr);
  const [changePass, setChangePass] = useState(false);
  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      position: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
    setUser({
      ...user,
      position: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
    updateCoordinates({
      position: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };
  const onError = (error) => {
    setLocation({
      loaded: false,
      error,
    });
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl + "passenger/" + cookies.get("form")._id)
      .then((response) => {
        cookies.set("form", response.data.data, { path: "/" });
        setUser(response.data.data);
        setChangePass(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUser = async () => {
    await axios
      .put(baseUrl + "passenger/" + user._id, user)
      .then((response) => {
        setUser(null);
        peticionGet();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateCoordinates = async (coordinates) => {
    await axios
      .put(baseUrl + "passenger/" + cookies.get("form")._id, coordinates)
      .then((response) => {
        setUser(null);
        peticionGet();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const handlePassword = (e) => {
    const { id, value } = e.target;
    setChangePass(true);
    setUser({
      ...user,
      [id]: md5(value),
    });
  };

  useEffect(() => {
    if (!cookies.get("form")) {
      props.history.push("/");
    } else {
      if (!("geolocation" in navigator)) {
        onError({
          code: 0,
          message: "Geolocation not supported",
        });
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  });
  return (
    <div className="Container">
      <NavMenu />
      <div id="formUser">
        <div className="row pt-5">
          <div className="col-sm-4">
            <label for="identification">Identification:</label>
            <input
              type="text"
              className="form-control"
              name="id"
              onChange={handleChange}
              value={user ? user.identification : ""}
              id="identification"
            />
          </div>
          <div className="col-sm-4">
            <label for="username">Username:</label>
            <input
              type="text"
              className="form-control"
              name="id"
              onChange={handleChange}
              value={user ? user.username : ""}
              id="username"
            />
          </div>
          <div className="col-sm-4">
            <label for="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handlePassword}
              id="password"
            />
          </div>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="col-sm-4">
            <label for="name">Name:</label>
            <input
              type="name"
              className="form-control"
              name="name"
              value={user ? user.name : ""}
              onChange={handleChange}
              id="name"
            />
          </div>
          <div className="col-sm-4">
            <label for="email">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={user ? user.email : ""}
              id="email"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 button-style">
            {location.loaded ? (
              <Maps
                position={location.position ? location.position : user.position}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`}
                loadingElement={
                  <ProgressBar color="black" colorBar="grey"></ProgressBar>
                }
                containerElement={<div style={{ height: `500px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            ) : (
              <ProgressBar color="black" colorBar="grey"></ProgressBar>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 button-style">
            <button
              id="updateUser"
              onClick={updateUser}
              className="btn btn-primary submit-button"
            >
              <FontAwesomeIcon icon={faSave} />
              {" Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User;
