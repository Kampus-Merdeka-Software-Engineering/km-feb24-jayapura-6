function updateCharts() {
    const yearCheckboxes = document.querySelectorAll('#yearDropdown input[type="checkbox"]:checked');
    const selectedYears = Array.from(yearCheckboxes).map(checkbox => checkbox.value);

    const categoryCheckboxes = document.querySelectorAll('#categoryDropdown input[type="checkbox"]:checked');
    const selectedCategories = Array.from(categoryCheckboxes).map(checkbox => checkbox.value);

    const countryCheckboxes = document.querySelectorAll('#countryDropdown input[type="checkbox"]:checked');
    const selectedCountries = Array.from(countryCheckboxes).map(checkbox => checkbox.value);

    const genderCheckboxes = document.querySelectorAll('#genderDropdown input[type="checkbox"]:checked');
    const selectedGenders = Array.from(genderCheckboxes).map(checkbox => checkbox.value);

    fetchDataAndCreateBikeChart(selectedYears, selectedCategories);
    fetchDataAndCreateRevenueChart(selectedYears, selectedCountries);
    fetchDataAndCreateGenderChart(selectedYears, selectedGenders);
    updateTotalOrderQuantity(selectedYears);
    updateTotalRevenueBersih(selectedYears);
}

document.querySelectorAll('#yearDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCharts);
});

document.querySelectorAll('#categoryDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCharts);
});

document.querySelectorAll('#countryDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCharts);
});

document.querySelectorAll('#genderDropdown input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateCharts);
});

// Initial fetch and render
document.addEventListener('DOMContentLoaded', function() {
    updateCharts();
});

function updateTotalOrderQuantity(selectedYears) {
    fetch('zdata/product_category.json')
        .then(response => response.json())
        .then(data => {
            // Filter data based on the selected years
            if (selectedYears.length > 0) {
                data = data.filter(item => selectedYears.includes(item.Year.toString()));
            }

            const totalOrderQuantity = data.reduce((sum, item) => sum + parseInt(item.Total_Order_Quantity), 0);
            document.getElementById('totalOrderQuantity').textContent = totalOrderQuantity;
        })
        .catch(error => console.error('Error fetching the data:', error));
}

function updateTotalRevenueBersih(selectedYears) {
    fetch('data/product_category.json')
        .then(response => response.json())
        .then(data => {
            // Filter data based on the selected years
            if (selectedYears.length > 0) {
                data = data.filter(item => selectedYears.includes(item.Year.toString()));
            }

            const totalRevenueBersih = data.reduce((sum, item) => sum + parseInt(item.Total_Revenue_bersih), 0);
            document.getElementById('totalRevenueBersih').textContent = totalRevenueBersih;
        })
        .catch(error => console.error('Error fetching the data:', error));
}
