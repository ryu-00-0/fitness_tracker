<?php
include "dbconn.php";


if($conn -> connect_error){
  die("Connection failed: " . $conn -> connect_error);
}

if($_SERVER ["REQUEST_METHOD"] == "POST"){
  $id = (int) $_POST["id"];
  $workout = $_POST["workout"];
  $sets = $_POST["sets"]; 
  $reps = $_POST["reps"];

   $sql = "UPDATE workouts 
          SET workout='$workout', sets='$sets', reps='$reps' 
          WHERE id=$id";


  if($conn -> query($sql) === TRUE){
    echo "Workout updated successfully";

}
else {
  echo "Error: " . $sql . "<br>" . $conn -> error;
}

}

$conn -> close();

?>