import React from 'react'
import { Doughnut } from 'react-chartjs-2';


const PieChart = (props) => {
    console.log(props.data);
    const purchaseData = props.data.reduce((acc, item) => {
        if (acc[item.product]) {
          acc[item.product] += item.price;
        } else {
          acc[item.product] = item.price;
        }
        return acc;
      }, {});

      const purchase = Object.entries(purchaseData).map(([name, totalPurchase]) => ({ name, totalPurchase }));

    const labels = purchase.map(purchase => purchase.name);
    const data = purchase.map(purchase => purchase.totalPurchase);

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