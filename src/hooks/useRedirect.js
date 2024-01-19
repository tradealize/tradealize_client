import { navigate } from "@reach/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { AvatarsContext } from "../context/AvatarsContext";
import { PurchasesContext } from "../context/PurchasesContext";
import { ConversationsContext } from "../context/ConversationsContext";

const useRedirect = (target) => {
  const { user } = useContext(AuthContext);
  const { avatars, getAvatars } = useContext(AvatarsContext);
  const { purchases, getPurchases } = useContext(PurchasesContext);
  const { conversations, getConversations } = useContext(ConversationsContext);

  useEffect(() => {
    handleWelcomeRedirect();
  }, [conversations, purchases, avatars]);

  const attemptWelcomeRedirect = () => {
    if (
      !window.location.pathname.includes("setting") &&
      !window.location.pathname.includes("billing") &&
      !window.location.pathname.includes("thankyou") &&
      !window.location.pathname.includes("checkout") &&
      !window.location.pathname.includes("pricing")
    ) {
      navigate(target);
    }
  };

  const handleWelcomeRedirect = (conversations, avatars, purchases) => {
    if (Array.isArray(conversations) && Array.isArray(avatars)) {
      if (conversations.length === 1 && avatars.length === 0) {
        if (Array.isArray(purchases)) {
          if (purchases.length === 0) {
            attemptWelcomeRedirect();
          }
        }
      }
    }
  };

  const handleRedirect = () => {
    getAvatars();
    getPurchases();
    getConversations();
  };

  return handleRedirect;
};

export default useRedirect;
