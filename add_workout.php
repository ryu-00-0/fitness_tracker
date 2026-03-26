<?php

include "dbconn.php";

if($_SERVER ["REQUEST_METHOD"] == "POST"){

$workout = $_POST["workout"];
$sets = $_POST["sets"];
$reps = $_POST["reps"];

$sql = "INSERT INTO workouts (workout, sets, reps) VALUES ('$workout', '$sets', '$reps')";

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