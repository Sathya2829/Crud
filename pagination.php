<?php
include 'db.php';

$limit = 5; // records per page

$sql = "SELECT COUNT(id) AS total FROM employees";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$total_records = $row['total'];
$total_pages = ceil($total_records / $limit);

$pagination = array(
    'total_pages' => $total_pages
);

echo json_encode($pagination);

$conn->close();
?>