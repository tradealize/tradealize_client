import React, { createContext, useReducer } from "react";
import { SET_SELECTED, TOGGLE_SETTINGS } from "../types/menu";
import MenuReducer from "../reducers/MenuReducer";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const initialState = {
    tabs: [],
    toolsTabs: {
      tools: {
        name: "Tools",
        icon: "fa fa-tools me-2",
        tabs: [],
      },
    },
    organizationTabs: {
      organization: {
        name: "Organization Admin",
        icon: "fas fa-building me-2",
        tabs: [
          {
            name: { en: "Admin Panel", es: "Panel de Administración" },
            icon: "fas fa-shield-alt",
            link: "admin-panel",
          },
          {
            name: { en: "Campaign", es: "Campaña" },
            icon: "fas fa-bullhorn",
            link: "campaign",
          },
          {
            name: { en: "Teams", es: "Equipos" },
            icon: "fas fa-users",
            link: "teams",
          },
        ],
      },
      organizationPicker: {
        name: "Organizations",
        icon: "fas fa-building me-2",
        tabs: [
          {
            name: { en: "Organization 1", es: "Organización 1" },
            icon: "fa fa-industry",
            link: "admin-panel",
          },
          {
            name: { en: "Organization 2", es: "Organización 2" },
            icon: "fa fa-industry",
            link: "campaign",
          },
          {
            name: { en: "Organization 3", es: "Organización 3" },
            icon: "fa fa-industry",
            link: "teams",
          },
        ],
      },
    },
    adminTabs: {
      admin: {
        name: "Admin",
        icon: "fa fa fa-user-shield me-2",
        tabs: [
          {
            link: "/admin",
            name: { en: "Purchases", es: "Comparas" },
            icon: "fa fa fa-dollar-sign me-2",
          },
          {
            link: "/admin/users",
            name: { en: "Users", es: "Usuarios" },
            icon: "fa fa-user-circle me-2",
          },
          {
            link: "/admin/staff",
            name: { en: "Staff", es: "Staff" },
            icon: "fa fa-user-check me-2",
          },
        ],
      },
      analytics: {
        name: "Analytics",
        icon: "fa fa fa-chart-pie me-2",
        tabs: [
          {
            link: "/admin/analytics/customers",
            name: { en: "Customers", es: "Clientes" },
            icon: "fa fa-user-check me-2",
          },
          {
            link: "/admin/analytics/income",
            name: { en: "Income", es: "Ingresos" },
            icon: "fa fa-dollar-sign me-2",
          },
          {
            link: "/admin/analytics/products",
            name: { en: "Products", es: "Productos" },
            icon: "fas fa-box me-2",
          },
        ],
      },
    },
    userSettingTabs: {
      userSettings: {
        name: user ? user?.name : "User Settings",
        icon: "fas fa-user me-2",
        tabs: [
          {
            link: "/tutorials",
            name: { en: "Tutorials", es: "Tutoriales" },
            icon: "fa fa-chalkboard me-2",
          },
          {
            link: "/billing",
            name: { en: "Billing", es: "Facturación" },
            icon: "fa fa-file-invoice me-2",
          },
          {
            name: { en: "Settings", es: "Ajustes" },
            icon: "fa fa-cog",
            link: "/settings",
          },
        ],
      },
    },
    selected: "",
    showSettings: false,
  };

  const [state, dispatch] = useReducer(MenuReducer, initialState);

  const setSelected = (name) => {
    dispatch({ type: SET_SELECTED, payload: name });
  };

  const toggleSettings = () => {
    dispatch({ type: TOGGLE_SETTINGS });
  };

  return (
    <MenuContext.Provider value={{ ...state, setSelected, toggleSettings }}>
      {children}
    </MenuContext.Provider>
  );
};
