import { IonModal } from "@ionic/react";
import React, { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

const MobileModal = () => {
  const { title, content, component, children, onCancel, showModal } =
    useContext(ModalContext);

  return (
    <IonModal
      handleBehavior="cycle"
      initialBreakpoint={0.9}
      breakpoints={[0.9, 0.95]}
      onDidDismiss={onCancel}
      isOpen={showModal}
    >
      <div className="px-3 py-4">
        {title && title !== "" ? <h2 className="h1">{title}</h2> : ""}
        {content}
        {component}
        {children}
      </div>
    </IonModal>
  );
};

export default MobileModal;
