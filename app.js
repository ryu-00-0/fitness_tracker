const workoutName = document.getElementById('workout-name');
const numberOfSets = document.getElementById('number-of-sets');
const numberOfReps = document.getElementById('number-of-reps');
const addWorkoutBtn = document.getElementById('add-workout-btn');
const workoutList = document.getElementById('workout-list');

const workouts = [];

addWorkoutBtn.addEventListener('click', function() {

  const workout = workoutName.value.trim();
  const sets = parseInt(numberOfSets.value);
  const reps = numberOfReps.value.trim();

  //input validation shit
  if (!workout || isNaN(sets) || !reps){
    alert("Please fill in all fields");
    return;
  }

  if (sets < 1 || sets > 10){
    alert("Sets must be between 1 and 10");
    return;
  }
  // checks if reps is in the format of "6-8" or "8-12" and that the numbers are between 1 and 100
  // regex shit
  const repPatterns = /^(\d+)(-\d+)?$/;
  if (!repPatterns.test(reps)){
    alert("Reps must be like '6-8' or '8-12'");
    return;
  }

  const editId = addWorkoutBtn.dataset.editId;

  if (editId) {
    fetch('edit_workout.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `id=${editId}&workout=${workout}&sets=${sets}&reps=${reps}`
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);

      const index = workouts.findIndex(w => w.id == editId);

      if (index !== -1) {
        workouts[index].name = workout;
        workouts[index].sets = sets;
        workouts[index].reps = reps;
      }

      displayWorkouts();

   
      delete addWorkoutBtn.dataset.editId;
    });

  } else {

    fetch('add_workout.php', {
      method: 'POST',
      headers: {
        //data format for php to read as form data
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `workout=${workout}&sets=${sets}&reps=${reps}`
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);

      const workoutPlan = {
        id: data,
        name: workout,
        sets: sets,
        reps: reps
      };

      workouts.push(workoutPlan);
      displayWorkouts();
    });
  }

  workoutName.value = '';
  numberOfSets.value = '';
  numberOfReps.value = '';
});



function displayWorkouts () {
  workoutList.innerHTML = '';

  workouts.forEach(function(workout){

    const workoutItem = document.createElement('div');

    workoutItem.textContent = 
      workout.name + " - " + workout.sets + " sets of " + workout.reps + " reps";

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', function(){
      deleteWorkout(workout.id);
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    editBtn.addEventListener('click', function(){
      editWorkout(workout.id);
    });

    workoutItem.appendChild(deleteBtn);
    workoutItem.appendChild(editBtn);
    workoutList.appendChild(workoutItem);
  });
}



function deleteWorkout(id){
  const index = workouts.findIndex(function(workout){
    return workout.id === id;
  });

  if (index !== -1){
    workouts.splice(index, 1);
    displayWorkouts();
  }
}



function editWorkout(id){
  const workout = workouts.find(w => w.id == id);

  if (!workout) return;

 
  workoutName.value = workout.name;
  numberOfSets.value = workout.sets;
  numberOfReps.value = workout.reps;


  addWorkoutBtn.dataset.editId = id;
}
