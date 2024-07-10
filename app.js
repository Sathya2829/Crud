$(document).ready(function() {
    // Load initial employee list
    loadEmployees(1);

    // Form submission using AJAX
    $('#employeeForm').submit(function(e) {
        e.preventDefault();
        
        $.ajax({
            type: 'POST',
            url: 'create.php',
            data: $('#employeeForm').serialize(),
            success: function(response) {
                $('#exampleModal').modal('hide');
                alert(response);
                loadEmployees(1); // Reload employee list after adding/updating
                $('#employeeForm')[0].reset();
            },
            error: function(error) {
                console.log(error);
                alert('Error saving record');
            }
        });
    });

    // Function to load employees with pagination
    function loadEmployees(page) {
        $.ajax({
            url: 'read.php?page=' + page,
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.length > 0) {
                    var tableHtml = '<table class="table table-striped"><thead><tr><th>Name</th><th>Phone Number</th><th>Email</th><th>Position</th><th>Actions</th></tr></thead><tbody>';
                    $.each(response, function(index, employee) {
                        tableHtml += '<tr>';
                        tableHtml += '<td>' + employee.name + '</td>';
                        tableHtml += '<td>' + employee.phone_number + '</td>';
                        tableHtml += '<td>' + employee.email + '</td>';
                        tableHtml += '<td>' + employee.position + '</td>';
                        tableHtml += '<td><button class="btn btn-info btn-sm view-btn" data-id="' + employee.id + '">View</button> <button class="btn btn-warning btn-sm edit-btn" data-id="' + employee.id + '">Edit</button> <button class="btn btn-danger btn-sm delete-btn" data-id="' + employee.id + '">Delete</button></td>';
                        tableHtml += '</tr>';
                    });
                    tableHtml += '</tbody></table>';
                    $('#employeeTable').html(tableHtml);

                    // Pagination
                    $.ajax({
                        url: 'pagination.php',
                        type: 'GET',
                        dataType: 'json',
                        success: function(pagination) {
                            var paginationHtml = '';
                            for (var i = 1; i <= pagination.total_pages; i++) {
                                paginationHtml += '<li class="page-item ' + (i === page ? 'active' : '') + '"><a class="page-link" href="#" data-page="' + i + '">' + i + '</a></li>';
                            }
                            $('#pagination').html(paginationHtml);
                        },
                        error: function(error) {
                            console.log(error);
                            alert('Error fetching pagination');
                        }
                    });
                } else {
                    $('#employeeTable').html('<p>No records found</p>');
                }
            },
            error: function(error) {
                console.log(error);
                alert('Error fetching records');
            }
        });
    }

    // Pagination click event
    $(document).on('click', '.page-link', function(e) {
        e.preventDefault();
        var page = $(this).data('page');
        loadEmployees(page);
    });

    // Edit button click event
$(document).on('click', '.edit-btn', function() {
    var id = $(this).data('id');
    $.ajax({
        url: 'fetch_single.php', // Ensure this URL is correct and points to your PHP script
        type: 'GET',
        data: { id: id }, // Send the ID as data
        dataType: 'json',
        success: function(response) {
            $('#exampleModal').modal('show');
            $('#id').val(response.id);
            $('#name').val(response.name);
            $('#phone_number').val(response.phone_number);
            $('#email').val(response.email);
            $('#position').val(response.position);
        },
        error: function(error) {
            console.log(error);
            alert('Error fetching record'); // This alert shows if there's an error
        }
    });
});

// View button click event (added)
$(document).on('click', '.view-btn', function() {
    var id = $(this).data('id');
    window.location.href = 'view.php?id=' + id; // Redirect to view.php with employee ID
});

    // Delete button click event
    $(document).on('click', '.delete-btn', function() {
        var id = $(this).data('id');
        if (confirm('Are you sure you want to delete this record?')) {
            $.ajax({
                url: 'delete.php',
                type: 'POST',
                data: { id: id },
                success: function(response) {
                    alert(response);
                    loadEmployees(1); // Reload employee list after deleting
                },
                error: function(error) {
                    console.log(error);
                    alert('Error deleting record');
                }
            });
        }
    });
});
