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
    <input type="text" id="workout-name" name="workout" placeholder="Enter workout name" required>
    <input type="number" id="number-of-sets" name="sets" placeholder="Enter number of sets" required>
    <input type="text" id="number-of-reps" name="reps" placeholder="Enter number of reps" required>
    <input type="text" id="weight" name="weight" placeholder="Enter weight used">
    <button id="add-workout-btn">Add workout</button>
  </div>

  <div id="workout-list">
    <h2>Your workouts</h2>
    <div id="workout-items"></div> 
  </div>

  <script src="app.js"></script>

</body>

</html>