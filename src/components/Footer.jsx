import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <p>
          © {new Date().getFullYear()} Old Alex Hub, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// You can customize these styles or move them to a separate CSS file
const footerStyle = {
  width: "100%",
  padding: "20px",
  backgroundColor: "#333",
  color: "white",
  textAlign: "center",
  position: "fixed", // You can change this to 'relative' if you don't want a fixed footer
  bottom: "0",
  left: "0",
};

const contentStyle = {
  maxWidth: "960px",
  margin: "0 auto",
};

export default Footer;
