<?php
// Connect to your database (you'll need to fill in your database credentials)
$pdo = new PDO('mysql:host=localhost;dbname=DMS', 'root', 'root');

// Get the selected product name from the query parameter
$selectedProduct = $_GET['product']; // Make sure to sanitize and validate this input

// Query to retrieve the cost of the selected product
$sql = "SELECT price FROM Prods WHERE name = :product";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':product', $selectedProduct, PDO::PARAM_STR);
$stmt->execute();

if ($stmt) {
    $productCost = $stmt->fetchColumn();

    // Return the product cost as JSON
    header('Content-Type: application/json');
    echo json_encode($productCost);
} else {
    // Handle database query error
    echo json_encode(['error' => 'Database query error']);
}
?>