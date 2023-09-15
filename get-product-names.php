<?php
// Connect to your database (you'll need to fill in your database credentials)
$pdo = new PDO('mysql:host=localhost;dbname=DMS', 'root', 'root');

// Query to retrieve product names
$sql = "SELECT name FROM Prods";
$stmt = $pdo->query($sql);

if ($stmt) {
    // Fetch all product names into an array
    $productNames = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    // Return the product names as JSON
    header('Content-Type: application/json');
    echo json_encode($productNames);
} else {
    // Handle database query error
    echo json_encode(['error' => 'Database query error']);
}
?>