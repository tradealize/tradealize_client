import React, { createContext, useContext, useReducer } from "react";
import StaffReducer from "../reducers/StaffReducer";
import StaffService from "../services/StaffService";
import { ModalContext } from "./ModalContext";
import { USERS_RECEIVED } from "../types";
import { hideModal } from "../utils";

const initialState = {
    users: null,
    user: null,
};

export const StaffContext = createContext(initialState);

export const StaffProvider = ({ children }) => {
    const [state, dispatch] = useReducer(StaffReducer, initialState);

    const { success } = useContext(ModalContext);

    const getStaff = (filters) => {
        StaffService.getAllStaff(filters).then((res) => {
            const { users } = res.data;
            dispatch({ type: USERS_RECEIVED, payload: users });
        });
    };

    const createStaff = (email, role) => {
        StaffService.postStaff(email, role).then(() => {
            getStaff();
            hideModal();
            success("Usuario creado con éxito.");
        });
    };

    const updateStaff = (staff_id, role) => {
        StaffService.putStaff(staff_id, role).then(() => {
            getStaff();
            hideModal();
            success("Usuario actualizado con éxito.");
        });
    };

    const deleteStaff = (staff_id) => {
        StaffService.deleteStaff(staff_id).then(() => {
            getStaff();
            hideModal();
            success("Usuario elminado con éxito.");
        });
    };

    const clearStaff = () => {
        dispatch({ type: USERS_RECEIVED, payload: null });
    };

    return (
        <StaffContext.Provider
            value={{
                ...state,
                getStaff,
                createStaff,
                updateStaff,
                deleteStaff,
                clearStaff,
            }}
        >
            {children}
        </StaffContext.Provider>
    );
};
