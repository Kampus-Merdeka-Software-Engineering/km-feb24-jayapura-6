document.addEventListener('DOMContentLoaded', (event) => {
    const ctx = document.getElementById('PieChartGender').getContext('2d');
    let pieChart;

    function fetchDataAndCreateChart(selectedYears = [], selectedGenders = []) {
        fetch('data/gender.json')
            .then(response => response.json())
            .then(data => {
                // Filter data based on the selected years
                if (selectedYears.length > 0) {
                    data = data.filter(item => selectedYears.includes(item.Year.toString()));
                }

                // Filter data based on the selected genders
                if (selectedGenders.length > 0) {
                    data = data.filter(item => selectedGenders.includes(item.Customer_Gender));
                }

                const genderLabels = [...new Set(data.map(item => item.Customer_Gender))];
                const totalQuantities = genderLabels.map(gender => {
                    return data
                        .filter(item => item.Customer_Gender === gender)
                        .reduce((sum, item) => sum + parseInt(item.Total_Order_Quantity), 0);
                });

                const totalQuantitySum = totalQuantities.reduce((sum, qty) => sum + qty, 0);
                const percentages = totalQuantities.map(qty => ((qty / totalQuantitySum) * 100).toFixed(2));

                if (pieChart) {
                    pieChart.destroy();
                }

                pieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: genderLabels.map((label, index) => `${label} (${percentages[index]}%)`),
                        datasets: [{
                            label: 'Total Order Quantity',
                            data: totalQuantities,
                            backgroundColor: ['#FF6384', '#36A2EB']
                        }]
                    },
                    options: {
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return `${tooltipItem.label}: ${tooltipItem.formattedValue}`;
                                    }
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error fetching the data:', error));
    }

    function updateChart() {
        const yearCheckboxes = document.querySelectorAll('#yearDropdown input[type="checkbox"]:checked');
        const selectedYears = Array.from(yearCheckboxes).map(checkbox => checkbox.value);

        const genderCheckboxes = document.querySelectorAll('#genderDropdown input[type="checkbox"]:checked');
        const selectedGenders = Array.from(genderCheckboxes).map(checkbox => checkbox.value);

        fetchDataAndCreateChart(selectedYears, selectedGenders);
    }

    document.querySelectorAll('#yearDropdown input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateChart);
    });

    document.querySelectorAll('#genderDropdown input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateChart);
    });

    // Initial fetch and render
    fetchDataAndCreateChart();
});
