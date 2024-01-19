import React, { useContext } from "react";
import HeaderRow from "../../components/global/HeaderRow";
import PanelTitleDate from "../../components/global/PanelTitleDate";
import { AnalyticsContext } from "../../context/AnalyticsContext";
import { formatMonto } from "../../utils";
import Chart from "react-apexcharts";

const AnalyticsProducts = () => {
  const { getPurchases, purchases } = useContext(AnalyticsContext);

  const renderChart = () => {
    if (Array.isArray(purchases)) {
      let globalTotal = 0;
      purchases.forEach((product) => {
        globalTotal += parseFloat(product.total);
      });
      return (
        <Chart
          type="donut"
          height="415"
          width="100%"
          options={{
            labels: purchases.map(({ name }) => name),
          }}
          series={purchases.map(({ total }) => total / globalTotal)}
        />
      );
    }
  };

  const renderAlumnas = () => {
    if (purchases && purchases !== null) {
      return purchases.map((product) => (
        <div className="row p-2" key={product.product_id}>
          <div className="col">{product.name}</div>
          <div className="col">{product.purchases}</div>
          <div className="col">
            {"$"}
            {formatMonto(product.total)}
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="container-fluid">
      <PanelTitleDate title="Products" callback={getPurchases} />
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-3 me-3  my-3">
            <h4>Purchases by Product</h4>
            <HeaderRow headers={["Name", "Purchases", "Total"]} />
            {renderAlumnas()}
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-3 me-3  my-3">
            <h4>Income by Product</h4>
            {renderChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsProducts;
