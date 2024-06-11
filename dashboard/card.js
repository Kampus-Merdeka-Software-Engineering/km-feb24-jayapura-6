document.addEventListener('DOMContentLoaded', function () {
    const yearDropdown = document.getElementById('yearDropdown');
    const totalOrderCard = document.getElementById('totalOrder');
    const revenueCard = document.getElementById('revenue');

    fetch('data/product_category.json')
        .then(response => response.json())
        .then(data => {
            function updateCards(selectedYears) {
                let totalOrderQuantity = 0;
                let totalRevenue = 0;

                data.forEach(item => {
                    if (selectedYears.includes(item.Year)) {
                        totalOrderQuantity += parseInt(item.Total_Order_Quantity);
                        totalRevenue += parseInt(item.Total_Revenue_bersih);
                    }
                });

                totalOrderCard.textContent = totalOrderQuantity;
                revenueCard.textContent = totalRevenue;
            }

            yearDropdown.addEventListener('change', function () {
                const selectedYears = Array.from(yearDropdown.querySelectorAll('input[type="checkbox"]:checked')).map(input => input.value);
                updateCards(selectedYears);
            });

            // Initially display all data
            const allYears = Array.from(yearDropdown.querySelectorAll('input[type="checkbox"]')).map(input => input.value);
            updateCards(allYears);
        });
});
