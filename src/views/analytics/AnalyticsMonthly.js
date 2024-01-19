import React from "react";
import PanelTitle from "../../components/global/PanelTitle";

const AnaliticasMensuales = () => {
  const renderIngresosMensuales = () => {
    if (ingresosMensuales && ingresosMensuales !== null) {
      const data = new Array(12).fill(1);
      data.forEach((one, index) => {
        const month = ingresosMensuales.find((mes) => mes.idMes === index + 1);
        if (month) {
          data[index] = {
            total: month.total,
            mes: moment(index + 1, "MM").format("MMM"),
          };
        } else {
          data[index] = {
            total: 0,
            mes: moment(index + 1, "MM").format("MMM"),
          };
        }
      });
      return (
        <Chart
          type="area"
          options={{
            colors: ["#dec1a1"],
            dataLabels: {
              formatter: (val, opts) => {
                return `$${formatMonto(val)}`;
              },
            },
            xaxis: {
              categories: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic",
              ],
            },
          }}
          series={[
            { name: "Ingresos por Mes", data: data.map(({ total }) => total) },
          ]}
        />
      );
    }
  };

  return (
    <div className="container-fluid">
      <PanelTitle title="Mensuales" />
    </div>
  );
};
