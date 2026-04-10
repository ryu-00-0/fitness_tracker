<?php
header("Content-Type: application/json");

include 'dbconn.php';

if (!$conn) {
  echo json_encode(["error" => "Database connection failed"]);
  exit;
}

$sql = "SELECT * FROM workouts";
$result = $conn->query($sql);

if (!$result) {
  echo json_encode(["error" => $conn->error]);
  exit;
}

$workouts = [];

while ($row = $result->fetch_assoc()) {
  $workouts[] = $row;
}

echo json_encode($workouts);

$conn->close();
?>