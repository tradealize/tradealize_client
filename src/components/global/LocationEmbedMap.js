import React from "react";
import { GOOGLE_MAPS_KEY } from "../../utils";

const LocationEmbedMap = ({ location }) => {
  return (
    <iframe
      width="100%"
      height={300}
      loading="lazy"
      allowFullScreen={false}
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_KEY}&q=${encodeURI(
        location
      )}`}
    ></iframe>
  );
};

export default LocationEmbedMap;
