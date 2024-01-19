import api from "./api";

const route = "/users";

const CustomerService = {
    extenderAcceso: (purchase_data) =>
        api.post(`${route}/giveAccess`, purchase_data),
    revokeAccess: (purchase_id) =>
        api.put(`${route}/revokeAccess`, { purchase_id }),
    postCustomer: (customer) => api.post(route, { ...customer }),
    putCustomer: (customer) => api.put(route, { ...customer }),
    createUserNoSignUp: (customer) => api.post(`${route}/admin/user`, { ...customer }),
    getPasswordResetLink: (email) => api.post(`${route}/resetPasswordLink`, { email }),
};

export default CustomerService;
