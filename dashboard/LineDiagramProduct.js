document.addEventListener('DOMContentLoaded', (event) => {
    const ctx = document.getElementById('LineDiagramProduct').getContext('2d');
    let lineChart;
    let minY, maxY; // variabel untuk menyimpan nilai minimum dan maksimum dari sumbu y

    function fetchDataAndCreateChart(selectedYears = []) {
        fetch('data/product_category.json')
            .then(response => response.json())
            .then(data => {
                // Filter data based on the selected years
                if (selectedYears.length > 0) {
                    data = data.filter(item => selectedYears.includes(item.Year.toString()));
                }

                const years = [...new Set(data.map(item => item.Year))];
                const categories = [...new Set(data.map(item => item.Product_Category))];

                const datasets = categories.map(category => {
                    return {
                        label: category,
                        data: years.map(year => {
                            const item = data.find(d => d.Year === year && d.Product_Category === category);
                            return item ? item.Total_Order_Quantity : 0;
                        }),
                        backgroundColor: getRandomColor()
                    };
                });

                // Calculate min and max values for y-axis
                minY = Math.min(...datasets.flatMap(dataset => dataset.data));
                maxY = Math.max(...datasets.flatMap(dataset => dataset.data));

                if (lineChart) {
                    lineChart.destroy();
                }

                lineChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: years,
                        datasets: datasets
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                suggestedMin: minY, // Set min value
                                suggestedMax: maxY, // Set max value
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error fetching the data:', error));
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function updateChart() {
        const checkboxes = document.querySelectorAll('#yearDropdown input[type="checkbox"]:checked');
        const selectedYears = Array.from(checkboxes).map(checkbox => checkbox.value);
        fetchDataAndCreateChart(selectedYears);
    }

    document.querySelectorAll('#yearDropdown input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateChart);
    });

    // Initial fetch and render
    fetchDataAndCreateChart();
});
