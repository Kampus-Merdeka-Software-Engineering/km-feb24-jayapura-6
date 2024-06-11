$(document).ready(function() {
    // Load JSON data
    $.getJSON("./data/datatable.json", function(data) {
      $('#example').DataTable({
        data: data,
        columns: [
          { data: 'Date', title: 'Date' },
          { data: 'Sub_Category', title: 'Name' },
          { data: 'Country', title: 'Country' },
          { data: 'Customer_Age', title: 'Age' },
          { data: 'Unit_Price', title: 'Price' },
          { data: 'Revenue', title: 'Revenue' }
        ],
        pageLength: 10,
        lengthMenu: [10, 15],
        searching: true,
        paging: true,
        info: true,
        language: {
          paginate: {
            next: 'Next',
            previous: 'Previous'
          }
        }
      });
    });
  });
  