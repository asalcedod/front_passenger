import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from "react-google-maps";

const Maps = ( {position} ,props) => {
  return (
    <GoogleMap defaultZoom={16} defaultCenter={{ lat: parseFloat(position.lat), lng: parseFloat(position.lng) }} ><Marker position={{ lat: parseFloat(position.lat), lng: parseFloat(position.lng) }}/></GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Maps));
