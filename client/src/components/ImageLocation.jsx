import React, { useState } from "react";

const ImageLocation = ({ longitude, latitude }) => {
  const [isOpen, setIsOpen] = useState(false);
  const mapSrc = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;
  return (
    <>
      {isOpen ? (
        <iframe
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={mapSrc}
        ></iframe>
      ) : null}
      <p>{`Latitude: ${latitude} \n Longitude: ${longitude}`}</p>
      <button className="btn btn-secondary"  onClick={() => setIsOpen((prevState) => !prevState)}>
        {isOpen ? "Hide" : "Expand"}
      </button>
    </>
  );
};

export default ImageLocation;
