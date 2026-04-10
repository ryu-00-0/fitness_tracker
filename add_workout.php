<?php

include "dbconn.php";

if($_SERVER ["REQUEST_METHOD"] == "POST"){

$workout = isset($_POST["workout"]) ? $_POST["workout"] : '';
$sets = isset($_POST["sets"]) ? $_POST["sets"] : '';
$reps = isset($_POST["reps"]) ? $_POST["reps"] : '';
$weight = isset($_POST["weight"]) ? $_POST["weight"] : '';

$sql = "INSERT INTO workouts (workout, sets, reps, weight) VALUES ('$workout', '$sets', '$reps', '$weight')";

if($conn -> query($sql) === TRUE){
  echo "Workout added successfully";
  // Gives frontend id from databse to use for editing and deleting
  echo $conn->insert_id;

} else {
  echo "Error: " . $sql . "<br>" . $conn -> error;
}

}

$conn -> close();
?>