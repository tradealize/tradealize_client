import React, { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";

const CancelForm = ({ purchase, cancelSubscription }) => {
  const [reason, setReason] = useState("");

  const { alert, clearModal } = useContext(ModalContext);

  const handleSubmit = () => {
    if (reason === "" || reason.length < 10) {
      return alert("You must include a cancel reason.");
    }
    cancelSubscription(purchase, reason);
  };

  return (
    <div>
      <p>Are you sure you want to cancel your subscription to BemodoAI?</p>{" "}
      <p>
        You will have access up to your next invoice date and then you will lose
        access to all of your content.
      </p>
      <p>You can always resubscribe.</p>
      <label>What's the reason to cancel your subscription?</label>
      <input
        type="text"
        value={reason}
        className="form-control mb-3"
        onChange={(e) => setReason(e.target.value)}
      />
      <button
        className="btn btn-danger btn-small w-100 mb-3"
        onClick={handleSubmit}
      >
        I understand, cancel my subscription
      </button>
      <button
        className="btn btn-link text-muted btn-small w-100"
        onClick={clearModal}
      >
        Nevermind, I'll keep it
      </button>
    </div>
  );
};

export default CancelForm;
