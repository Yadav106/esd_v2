import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const PieChart = (props) => {
    const salesData = props.data.reduce((acc, item) => {
        if (acc[item.product]) {
          acc[item.product] += item.price;
        } else {
          acc[item.product] = item.price;
        }
        return acc;
      }, {});

      const sales = Object.entries(salesData).map(([name, totalSales]) => ({ name, totalSales }));

    const labels = sales.map(sale => sale.name);
    const data = sales.map(sale => sale.totalSales);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      };

    return (
        <Doughnut data={{ labels, datasets: [{ data }] }} options={options} />
    )
}

export default PieChart