<?php

include "dbconn.php";

if($_SERVER ["REQUEST_METHOD"] == "POST"){
  
$workout = $_POST["workout"] ?? '';
$sets = $_POST["sets"] ?? '';
$reps = $_POST["reps"] ?? '';
$weight = $_POST["weight"] ?? '';

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