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

  <div id="app-wrapper">

    <h1 id="app-title">💪 Workout Tracker</h1>

    <div id="workout-input">
      <input type="text" id="workout-name" placeholder="Exercise name" required>
      <input type="number" id="number-of-sets" placeholder="Sets" required>
      <input type="text" id="number-of-reps" placeholder="Reps (e.g. 8-12)" required>
      <input type="text" id="weight-used" placeholder="Weight used" required>
      <button id="add-workout-btn">Add workout</button>
    </div>

    <div id="workout-list">
      <div id="workout-items"></div>
    </div>

  </div>

  <script src="app.js"></script>

</body>

</html>
