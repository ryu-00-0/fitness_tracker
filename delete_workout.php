<?php
include "dbconn.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = intval($_POST['id']);

    if ($id <= 0) {
        echo "Error: Invalid workout ID";
        exit;
    }

    $sql = "DELETE FROM workouts WHERE id = ?";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $id);

        if (mysqli_stmt_execute($stmt)) {
            $affected = mysqli_stmt_affected_rows($stmt);
            if ($affected > 0) {
                echo "Workout deleted successfully";
            } else {
                echo "Error: Workout not found";
            }
        } else {
            echo "Error: " . mysqli_error($conn);
        }
        mysqli_stmt_close($stmt);
    } else {
        echo "Error: " . mysqli_error($conn);
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>