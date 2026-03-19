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

  if (!workout || !sets || !reps){
    alert("Please fill in all fields");
    return;
  }

  if (sets < 1 || sets > 10){
    alert("Sets must be between 1 and 10");
    return;
  }

  const repPatterns = /^(\d+)(-\d+)?$/;
  if (!repPatterns.test(reps)){
    alert("Reps must be like '6-8' or '8-12'");
    return;
  }

  const workoutPlan = {
    name: workout,
    sets: sets,
    reps: reps
  };

  workouts.push(workoutPlan);

  displayWorkouts(); 

  workoutName.value = '';
  numberOfSets.value = '';
  numberOfReps.value = '';
});


function displayWorkouts () {
  workoutList.innerHTML = '';

  workouts.forEach(function(workout, index){
    const workoutItem = document.createElement('div');

    workoutItem.textContent = 
      workout.name + " - " + workout.sets + " sets of " + workout.reps + " reps";

    workoutList.appendChild(workoutItem);

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
  const index = workouts.findIndex(function(workout){
    return workout.id === id;
  });

  if (index === -1) return;

  const newName = prompt("Enter new workout name:", workouts[index].name);
  const newSets = prompt("Enter new number of sets:", workouts[index].sets);
  const newReps = prompt("Enter new reps pattern:", workouts[index].reps);

  if(!newName || !newSets || !newReps){
    alert("Please fill in all fields");
    return;
  }

  workouts[index].name = newName;
  workouts[index].sets = parseInt(newSets);
  workouts[index].reps = newReps;

  displayWorkouts();


}