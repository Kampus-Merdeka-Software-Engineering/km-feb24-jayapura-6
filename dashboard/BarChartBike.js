let bikeChartInstance;

function fetchDataAndCreateBikeChart(selectedYears = [], selectedCategories = []) {
    fetch('data/bikes_category.json')
        .then(response => response.json())
        .then(data => {
            // Filter data based on the selected years
            if (selectedYears.length > 0) {
                data = data.filter(item => selectedYears.includes(item.Year.toString()));
            }

            // Filter data based on the selected categories
            if (selectedCategories.length > 0) {
                data = data.filter(item => selectedCategories.includes(item.Sub_Category));
            }

            // Combine data by Sub_Category
            const combinedData = data.reduce((acc, item) => {
                const key = item.Sub_Category;
                if (!acc[key]) {
                    acc[key] = { Total_Order_Quantity: 0 };
                }
                acc[key].Total_Order_Quantity += parseInt(item.Total_Order_Quantity, 10);
                return acc;
            }, {});

            const labels = Object.keys(combinedData);
            const quantities = Object.values(combinedData).map(item => item.Total_Order_Quantity);

            const ctx = document.getElementById('BarChartBike').getContext('2d');
            if (bikeChartInstance) {
                bikeChartInstance.destroy();
            }
            bikeChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Order Quantity',
                        data: quantities,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching the data:', error));
}

function updateBikeChart() {
    const yearCheckboxes = document.querySelectorAll('#yearDropdown input[type="checkbox"]:checked');
    const selectedYears = Array.from(yearCheckboxes).map(checkbox => checkbox.value);

    const categoryCheckboxes = document.querySelectorAll('#categoryDropdown input[type="checkbox"]:checked');
    const selectedCategories = Array.from(categoryCheckboxes).map(checkbox => checkbox.value);

    fetchDataAndCreateBikeChart(selectedYears, selectedCategories);
}

document.querySelectorAll('#yearDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateBikeChart);
});

document.querySelectorAll('#categoryDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateBikeChart);
});

// Initial fetch and render
document.addEventListener('DOMContentLoaded', function() {
    updateBikeChart();
});
