<?php
include 'db.php';

// Initialize variables
$name = $_POST['name'];
$phone_number = $_POST['phone_number'];
$email = $_POST['email'];
$position = $_POST['position'];
$id = $_POST['id']; // for update operation

if (!empty($id)) {
    // Update record
    $sql = "UPDATE employees SET name='$name', phone_number='$phone_number', email='$email', position='$position' WHERE id=$id";
} else {
    // Insert new record
    $sql = "INSERT INTO employees (name, phone_number, email, position) VALUES ('$name', '$phone_number', '$email', '$position')";
}

if ($conn->query($sql) === TRUE) {
    echo "Record saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>