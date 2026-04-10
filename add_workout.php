<?php

include "dbconn.php";

if($_SERVER ["REQUEST_METHOD"] == "POST"){
<<<<<<< HEAD
  
$workout = $_POST["workout"] ?? '';
$sets = $_POST["sets"] ?? '';
$reps = $_POST["reps"] ?? '';
$weight = $_POST["weight"] ?? '';
=======

$workout = isset($_POST["workout"]) ? $_POST["workout"] : '';
$sets = isset($_POST["sets"]) ? $_POST["sets"] : '';
$reps = isset($_POST["reps"]) ? $_POST["reps"] : '';
$weight = isset($_POST["weight"]) ? $_POST["weight"] : '';
>>>>>>> 16cf4163d40e0e4eae1a04109d3709ece71bb4c5

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