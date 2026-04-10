<?php
include "dbconn.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get POST data
    $id = intval($_POST['id']);

    // Validate input
    if ($id <= 0) {
        echo "Error: Invalid workout ID";
        exit;
    }

    // Prepare and execute delete query
    $sql = "DELETE FROM workouts WHERE id = ?";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $id);

        if (mysqli_stmt_execute($stmt)) {
            $affected_rows = mysqli_stmt_affected_rows($stmt);
            if ($affected_rows > 0) {
                echo "Workout deleted successfully";
            } else {
                echo "Error: No workout found with that ID";
            }
        } else {
            echo "Error deleting workout: " . mysqli_stmt_error($stmt);
        }
        mysqli_stmt_close($stmt);
    } else {
        echo "Error preparing statement";
    }
} else {
    echo "Invalid request method";
}

$conn->close();
?>