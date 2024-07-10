<?php
include 'db.php';

$limit = 5; // records per page
$page = $_GET['page'];

if (empty($page)) {
    $page = 1;
}

$start = ($page - 1) * $limit;

$sql = "SELECT * FROM employees LIMIT $start, $limit";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo "No records found";
}

$conn->close();
?>