import { IonLabel } from "@ionic/react";
import React from "react";

const IconItem = ({ icon, name, children }) => {
  return (
    <div className="row py-2 align-items-center">
      <div className="col-3">
        <div className="icon-wrapper bg-light border">
          <i className={`fa fa-${icon}`}></i>
        </div>
      </div>
      <div className="col-9">
        <IonLabel>
          <h4 className="bold">{name}</h4>
          {children}
        </IonLabel>
      </div>
    </div>
  );
};
export default IconItem;
