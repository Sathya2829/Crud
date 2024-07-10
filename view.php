<?php
include 'db.php';

$id = $_GET['id'];

$sql = "SELECT * FROM employees WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $name = $row['name'];
    $phone_number = $row['phone_number'];
    $email = $row['email'];
    $position = $row['position'];
} else {
    echo "Employee not found";
    exit;
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View Employee</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h2>View Employee</h2>
                <table class="table">
                    <tr>
                        <th>Name:</th>
                        <td><?php echo $name; ?></td>
                    </tr>
                    <tr>
                        <th>Phone Number:</th>
                        <td><?php echo $phone_number; ?></td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td><?php echo $email; ?></td>
                    </tr>
                    <tr>
                        <th>Position:</th>
                        <td><?php echo $position; ?></td>
                    </tr>
                </table>
                <a href="index.html" class="btn btn-primary">Back to List</a>
            </div>
        </div>
    </div>
</body>
</html>
