<?php
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Workout App</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

  <div id="workout-input">
    <input type="text" id="workout-name" placeholder="Enter workout name" required>
    <input type="number" id="number-of-sets" placeholder="Enter number of sets" required>
    <input type="text" id="number-of-reps" placeholder="Enter number of reps" required>
    <input type="text" id="weight-used" placeholder="Enter weight used">
    <button id="add-workout-btn">Add workout</button>
  </div>

  <div id="workout-list">
    <h2>Your workouts</h2>
    <div id="workout-items"></div> 
  </div>

<?php
include 'dbconn.php';

$query = "SELECT * FROM workouts";
$result = mysqli_query($conn, $query);

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<div>";
        echo $row['workout'] . " workout " . $row['sets'] . " sets " . $row['reps'] . " reps " . $row['weight'] . " weight";
        echo "</div>";
    }
} else {
    echo "No workouts found.";
}
?>
  <script src="app.js"></script>
</body>

</html>