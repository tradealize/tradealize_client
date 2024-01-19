import React from "react";
import Footer from "./Footer";
import Navbar from "../navbar/Navbar";

const Page = ({ title, children }) => {
  return (
    <div className="container-fluid text-white px-0">
      <Navbar />
      <div
        className={`container mvh-100 page-content py-5 mt-${
          title && title !== "" ? "2" : "5"
        }`}
      >
        {title && title !== null && title !== "" && (
          <h1 className="mt-5 mb-4 pb-3 border-bottom">{title}</h1>
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
