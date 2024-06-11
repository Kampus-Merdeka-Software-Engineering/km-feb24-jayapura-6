let chartInstance;

function fetchDataAndCreateChart(selectedYears = [], selectedCountries = []) {
    fetch('data/country.json')
        .then(response => response.json())
        .then(data => {
            // Filter data based on the selected years
            if (selectedYears.length > 0) {
                data = data.filter(item => selectedYears.includes(item.Year.toString()));
            }

            // Filter data based on the selected countries
            if (selectedCountries.length > 0) {
                data = data.filter(item => selectedCountries.includes(item.Country));
            }

            // Combine data by country
            const combinedData = data.reduce((acc, item) => {
                const key = item.Country;
                if (!acc[key]) {
                    acc[key] = { Total_Revenue_bersih: 0 };
                }
                acc[key].Total_Revenue_bersih += parseInt(item.Total_Revenue_bersih, 10);
                return acc;
            }, {});

            const labels = Object.keys(combinedData);
            const totalRevenue = Object.values(combinedData).map(item => item.Total_Revenue_bersih);

            const ctx = document.getElementById('BarChartRevenue').getContext('2d');
            if (chartInstance) {
                chartInstance.destroy();
            }
            chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Revenue Bersih',
                        data: totalRevenue,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Update the country count card
            document.getElementById('countryCount').textContent = selectedCountries.length || labels.length;
        })
        .catch(error => console.error('Error fetching the JSON data:', error));
}

function updateRevenueChart() {
    const yearCheckboxes = document.querySelectorAll('#yearDropdown input[type="checkbox"]:checked');
    const selectedYears = Array.from(yearCheckboxes).map(checkbox => checkbox.value);

    const countryCheckboxes = document.querySelectorAll('#countryDropdown input[type="checkbox"]:checked');
    const selectedCountries = Array.from(countryCheckboxes).map(checkbox => checkbox.value);

    fetchDataAndCreateChart(selectedYears, selectedCountries);
}

document.querySelectorAll('#yearDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateRevenueChart);
});

document.querySelectorAll('#countryDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateRevenueChart);
});

// Initial fetch and render
document.addEventListener('DOMContentLoaded', function() {
    updateRevenueChart();
});
