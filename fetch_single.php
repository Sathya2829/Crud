<?php
include 'db.php';

$id = $_GET['id'];

$sql = "SELECT * FROM employees WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo "Record not found";
}

$conn->close();
?>
