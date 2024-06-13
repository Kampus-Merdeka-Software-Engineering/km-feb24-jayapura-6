function updateLoggedInUserName() {
  const loggedInName = document.getElementById("loggedInName");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    loggedInName.textContent = storedUser.name;
  }
}

updateLoggedInUserName();

document.querySelectorAll(".sidebar-submenu").forEach((e) => {
  e.querySelector(".sidebar-menu-dropdown").onclick = (event) => {
    event.preventDefault();
    e.querySelector(".sidebar-menu-dropdown .dropdown-icon").classList.toggle(
      "active"
    );

    let dropdown_content = e.querySelector(".sidebar-menu-dropdown-content");
    let dropdown_content_lis = dropdown_content.querySelectorAll("li");

    let active_height =
      dropdown_content_lis[0].clientHeight * dropdown_content_lis.length;

    dropdown_content.classList.toggle("active");

    dropdown_content.style.height = dropdown_content.classList.contains(
      "active"
    )
      ? active_height + "px"
      : "0";
  };
});

// Fetch and render category chart
fetch("/assets/data/age_group.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const series = jsonData.map((item) => parseInt(item.Total_Order_Quantity));
    const labels = jsonData.map((item) => {
      if (item.Age_Group.includes("(")) {
        return item.Age_Group.split(" ")[0];
      }
      return item.Age_Group;
    });

    let category_options = {
      series: series,
      labels: labels,
      chart: {
        type: "donut",
      },
      colors: ["#6ab04c", "#2980b9", "#f39c12", "#d35400"],
    };

    let category_chart = new ApexCharts(
      document.querySelector("#category-chart"),
      category_options
    );
    category_chart.render();
  });

// Fetch and render sub-category chart
fetch("/assets/data/bikes_category.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const categories = jsonData.map(item => item.Sub_Category);
    const seriesData = [
      {
        name: "Total Order",
        data: jsonData.map(item => parseInt(item.Total_Order_Quantity)),
      },
    ];

    let sub_category_options = {
      series: seriesData,
      chart: {
        type: "bar",
      },
      colors: ["#6ab04c", "#2980b9", "#f39c12"],
      xaxis: {
        categories: categories,
      },
    };

    let sub_category_chart = new ApexCharts(
      document.querySelector("#sub-category-chart"),
      sub_category_options
    );
    sub_category_chart.render();
  });

// Fetch and render country chart
fetch('/assets/data/country.json')
  .then(response => response.json())
  .then(jsonData => {
    const countries = [
      "United States",
      "Australia",
      "United Kingdom",
      "Germany",
      "France",
      "Canada",
    ];
    const seriesData = jsonData.map(data => parseInt(data.Total_Revenue_bersih));

    let country_options = {
      series: [{
        name: "Total Revenue",
        data: seriesData
      }],
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ["#6ab04c", "#2980b9", "#f39c12"],
      xaxis: {
        categories: countries,
      },
    };

    let country_chart = new ApexCharts(
      document.querySelector("#country-chart"),
      country_options
    );
    country_chart.render();
  });

// Fetch and render gender chart
fetch("/assets/data/gender.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const genders = ["M", "F"];
    const seriesData = genders.map((gender) => {
      return jsonData
        .filter((data) => data.Customer_Gender === gender)
        .reduce((acc, data) => acc + parseInt(data.Total_Order_Quantity), 0);
    });

    let gender_options = {
      series: seriesData,
      labels: genders,
      chart: {
        type: "pie",
      },
      colors: ["#6ab04c", "#2980b9"],
    };

    let gender_chart = new ApexCharts(
      document.querySelector("#gender-chart"),
      gender_options
    );
    gender_chart.render();
  });

// Fetch and render customer chart
fetch("/assets/data/product_category.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const years = ["2015", "2016"];
    const categories = ["Bikes", "Accessories", "Clothing"];
    const seriesData = categories.map((category) => {
      return {
        name: category,
        data: years.map((year) => {
          const item = jsonData.find(
            (data) => data.Year === year && data.Product_Category === category
          );
          return item ? parseInt(item.Total_Order_Quantity) : 0;
        }),
      };
    });

    let customer_options = {
      series: seriesData,
      colors: ["#6ab04c", "#2980b9", "#f39c12"],
      chart: {
        height: 350,
        type: "line",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: years,
      },
      legend: {
        position: "top",
      },
    };

    let customer_chart = new ApexCharts(
      document.querySelector("#customer-chart"),
      customer_options
    );
    customer_chart.render();
  });

setDarkChart = (dark) => {
  let theme = {
    theme: {
      mode: dark ? "dark" : "light",
    },
  };

  customer_chart.updateOptions(theme);
  category_chart.updateOptions(theme);
  gender_chart.updateOptions(theme);
  country_chart.updateOptions(theme);
  sub_category_chart.updateOptions(theme);
};

// DARK MODE TOGGLE
let darkmode_toggle = document.querySelector("#darkmode-toggle");

darkmode_toggle.onclick = (e) => {
  e.preventDefault();
  document.querySelector("body").classList.toggle("dark");
  darkmode_toggle.querySelector(".darkmode-switch").classList.toggle("active");
  setDarkChart(document.querySelector("body").classList.contains("dark"));
};

let overlay = document.querySelector(".overlay");
let sidebar = document.querySelector(".sidebar");

document.querySelector("#mobile-toggle").onclick = () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
};

document.querySelector("#sidebar-close").onclick = () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
};

function logout() {
  localStorage.removeItem("user");
  alert("Logout successful!");
  // Redirect ke halaman login setelah logout
  window.location.href = "/login.html";
}
