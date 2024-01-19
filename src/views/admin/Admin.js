import { Router } from "@reach/router";
import React from "react";
import AdminPurchases from "./AdminPurchases";
import AdminUsers from "./AdminUsers";
import AdminSingleUser from "./AdminSingleUser";
import AnalyticsIncome from "../analytics/AnalyticsIncome";
import AnalyticsRegistered from "../analytics/AnalyticsCustomers";
import AnalyticsProducts from "../analytics/AnalyticsProducts";
import AdminStaff from "./AdminStaff";
import AdminCustomerForm from "./AdminCustomerForm";

const Admin = () => {
  return (
    <Router className="h-100">
      <AdminPurchases path="/" default />
      <AdminStaff path="/staff" />
      <AdminUsers path="/users" />
      <AdminSingleUser path="users/:user_id" />
      <AdminCustomerForm path="users/:user_id/edit/" />
      {/* *-----Analytics------* */}
      <AnalyticsIncome path="/analytics/income" />
      <AnalyticsRegistered path="/analytics/customers" />
      <AnalyticsProducts path="/analytics/products" />
    </Router>
  );
};

export default Admin;