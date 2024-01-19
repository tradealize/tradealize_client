import React, { useContext } from "react";
import { AnalyticsContext } from "../../context/AnalyticsContext";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import { formatMonto } from "../../utils";
import HeaderRow from "../../components/global/HeaderRow";
import Chart from "react-apexcharts";

const AnalyticsIncome = () => {
  const { income, payment_methods, getIngresos } = useContext(AnalyticsContext);

  const renderChart = () => {
    if (Array.isArray(payment_methods)) {
      let total = 0;
      payment_methods.forEach((payment_method) => {
        total += parseFloat(payment_method.total);
      });
      const data = payment_methods.map((payment_method) => ({
        ...payment_method,
        porcentaje: parseFloat(payment_method.total) / parseFloat(total),
      }));
      return (
        <Chart
          type="donut"
          height="415"
          width="100%"
          options={{
            labels: data.map(({ name }) => name),
          }}
          series={data.map(({ porcentaje }) => porcentaje)}
        />
      );
    }
  };

  const renderIncome = () => {
    if (Array.isArray(payment_methods)) {
      let total = 0;
      payment_methods.forEach((method) => {
        let current = parseFloat(method.total);
        total += current;
      });
      return (
        <h4 className="h1 normal">
          {"$"}
          {formatMonto(total.toFixed(2))}
        </h4>
      );
    }
    return <div className="spinner-border"></div>;
  };

  const renderPayments = () => {
    if (income && income !== null) {
      return <h4 className="h1 normal">{income.payments}</h4>;
    }
    return <div className="spinner-border"></div>;
  };

  const renderMethods = () => {
    if (payment_methods && payment_methods !== null) {
      return payment_methods.map((method) => (
        <div
          key={method.name}
          className="row p-2 mx-0 align-items-center border-bottom"
        >
          <div className="col-4">{method.name}</div>
          <div className="col-4">{method.payments}</div>
          <div className="col-4">
            {"$"}
            {formatMonto(method.total)}
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="container-fluid px-3">
      <PanelTitleDate title="Income" callback={getIngresos} />
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="card shadow-sm p-3 ">
                <h3>Total Income</h3>
                {renderIncome()}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card shadow-sm p-3 ">
                <h3>Total Payments</h3>
                {renderPayments()}
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="container-fluid">
              <div className="card shadow-sm p-3  pb-4">
                <h3>Payment Methods</h3>
                <HeaderRow headers={["Nombre", "Pagos", "Total"]} />
                {renderMethods()}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-3 ">
            <h3>Payment Methods by Income</h3>
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsIncome;
