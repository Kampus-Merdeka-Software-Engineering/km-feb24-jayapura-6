document.addEventListener('DOMContentLoaded', function () {
    const ageGroupDropdown = document.getElementById('ageGroupDropdown');
    const checkboxes = ageGroupDropdown.querySelectorAll('input[type="checkbox"]');
    let originalData = [];

    function fetchDataAndRenderChart() {
        fetch('data/age_group.json')
            .then(response => response.json())
            .then(data => {
                originalData = data; // Store the original data
                renderChart();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function renderChart() {
        const selectedAgeGroups = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const filteredData = selectedAgeGroups.length
            ? originalData.filter(item => selectedAgeGroups.includes(item.Age_Group))
            : originalData;

        const labels = filteredData.map(item => item.Age_Group);
        const values = filteredData.map(item => item.Total_Order_Quantity);

        const ctx = document.getElementById('DoughnutChartAge').getContext('2d');
        if (window.myChart) {
            window.myChart.destroy(); // Destroy the existing chart instance
        }
        window.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Order Quantity',
                    data: values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Doughnut Chart - Total Order Quantity by Age Group'
                    }
                }
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', renderChart);
    });

    fetchDataAndRenderChart();
});
