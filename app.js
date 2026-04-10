const workoutName = document.getElementById('workout-name');
const numberOfSets = document.getElementById('number-of-sets');
const numberOfReps = document.getElementById('number-of-reps');
const weightInput = document.getElementById('weight');
const addWorkoutBtn = document.getElementById('add-workout-btn');
const workoutItems = document.getElementById('workout-items');

const workouts = [];

const palettes = [
  { bg: '#FAC775', text: '#633806' },
  { bg: '#9FE1CB', text: '#085041' },
  { bg: '#F4C0D1', text: '#72243E' },
  { bg: '#B5D4F4', text: '#0C447C' },
  { bg: '#C0DD97', text: '#27500A' },
  { bg: '#F5C4B3', text: '#712B13' },
  { bg: '#CECBF6', text: '#3C3489' },
];
let paletteIdx = 0;

function randomTilt() {
  return (Math.random() * 4 - 2).toFixed(1) + 'deg';
}

// Load existing workouts when page loads
window.addEventListener('load', function () {
  loadWorkouts();
});

function loadWorkouts() {
  fetch('get_workout.php')
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error loading workouts:', data.error);
        return;
      }
      workouts.length = 0;
      data.forEach(workout => {
        workouts.push({
          id: workout.id,
          name: workout.workout,
          sets: workout.sets,
          reps: workout.reps,
          weight: workout.weight,
          color: palettes[paletteIdx % palettes.length],
          tilt: randomTilt()
        });
        paletteIdx++;
      });
      displayWorkouts();
    })
    .catch(error => {
      console.error('Error loading workouts:', error);
    });
}

addWorkoutBtn.addEventListener('click', function () {

  const workout = workoutName.value.trim();
  const sets = parseInt(numberOfSets.value);
  const reps = numberOfReps.value.trim();
  const weight = weightInput.value.trim();

  // Clear previous error states
  [workoutName, numberOfSets, numberOfReps, weightUsed].forEach(el => el.classList.remove('error'));

  // Input validation - weight is required
  if (!workout || isNaN(sets) || !reps || !weight) {
    if (!workout) workoutName.classList.add('error');
    if (isNaN(sets)) numberOfSets.classList.add('error');
    if (!reps) numberOfReps.classList.add('error');
    if (!weight) weightUsed.classList.add('error');
    alert("Please fill in all fields");
    return;
  }

  if (sets < 1 || sets > 10) {
    numberOfSets.classList.add('error');
    alert("Sets must be between 1 and 10");
    return;
  }

  const repPatterns = /^(\d+)(-\d+)?$/;
  if (!repPatterns.test(reps)) {
    numberOfReps.classList.add('error');
    alert("Reps must be like '6-8' or '8-12'");
    return;
  }

  const editId = addWorkoutBtn.dataset.editId;

  if (editId) {
    fetch('edit_workout.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `id=${editId}&workout=${encodeURIComponent(workout)}&sets=${sets}&reps=${encodeURIComponent(reps)}&weight=${encodeURIComponent(weight)}`
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        const index = workouts.findIndex(w => w.id == editId);
        if (index !== -1) {
          workouts[index].name = workout;
          workouts[index].sets = sets;
          workouts[index].reps = reps;
          workouts[index].weight = weight;
        }
        displayWorkouts();
        delete addWorkoutBtn.dataset.editId;
        addWorkoutBtn.textContent = 'Add workout';
        addWorkoutBtn.classList.remove('editing');
      });

  } else {
    fetch('add_workout.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `workout=${encodeURIComponent(workout)}&sets=${sets}&reps=${encodeURIComponent(reps)}&weight=${encodeURIComponent(weight)}`
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        const idMatch = data.match(/(\d+)$/);
        const newId = idMatch ? idMatch[1] : null;

<<<<<<< HEAD
      // Extract the ID from the response (it comes after "Workout added successfully")
      const idMatch = data.match(/(\d+)$/);
      const newId = idMatch ? idMatch[1] : null;

      const workoutPlan = {
        id: newId,
        name: workout,
        sets: sets,
        reps: reps,
        weight: weight
      };

      workouts.push(workoutPlan);
      displayWorkouts();
    });

=======
        workouts.push({
          id: newId,
          name: workout,
          sets: sets,
          reps: reps,
          weight: weight,
          color: palettes[paletteIdx % palettes.length],
          tilt: randomTilt()
        });
        paletteIdx++;
        displayWorkouts();
      });
>>>>>>> 16cf4163d40e0e4eae1a04109d3709ece71bb4c5
  }

  workoutName.value = '';
  numberOfSets.value = '';
  numberOfReps.value = '';
<<<<<<< HEAD
  weightInput.value = '';

=======
  weightUsed.value = '';
>>>>>>> 16cf4163d40e0e4eae1a04109d3709ece71bb4c5
});


function displayWorkouts() {
  workoutItems.innerHTML = '';

  if (workouts.length === 0) {
    workoutItems.innerHTML = '<div id="empty-msg">No workouts yet — add one above!</div>';
    return;
  }

  workouts.forEach(function (workout) {
    const note = document.createElement('div');
    note.className = 'note-card';
    note.style.background = workout.color.bg;
    note.style.color = workout.color.text;
    note.style.transform = `rotate(${workout.tilt})`;

    note.innerHTML = `
      <button class="note-close" title="Delete">&#x2715;</button>
      <div class="note-name">${workout.name}</div>
      <hr class="note-divider">
      <div class="note-stats">
        <div class="note-stat">
          <span class="stat-label">Sets</span>
          <span class="stat-value">${workout.sets}</span>
        </div>
        <div class="note-stat">
          <span class="stat-label">Reps</span>
          <span class="stat-value">${workout.reps}</span>
        </div>
        <div class="note-stat">
          <span class="stat-label">Weight</span>
          <span class="stat-value">${workout.weight}</span>
        </div>
      </div>
      <div class="note-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

<<<<<<< HEAD
    workoutItem.textContent = 
      workout.name + " - " + workout.sets + " sets of " + workout.reps + " reps" + "weight" + workout.weight;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', function(){
=======
    note.querySelector('.note-close').addEventListener('click', function () {
>>>>>>> 16cf4163d40e0e4eae1a04109d3709ece71bb4c5
      deleteWorkout(workout.id);
    });

    note.querySelector('.delete-btn').addEventListener('click', function () {
      deleteWorkout(workout.id);
    });

    note.querySelector('.edit-btn').addEventListener('click', function () {
      editWorkout(workout.id);
    });

    workoutItems.appendChild(note);
  });

 
}


function deleteWorkout(id) {
  fetch('delete_workout.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `id=${id}`
  })
    .then(response => response.text())
    .then(data => {
      if (data.includes('successfully')) {
        const index = workouts.findIndex(w => w.id == id);
        if (index !== -1) {
          workouts.splice(index, 1);
          displayWorkouts();
        }
      } else {
        alert('Error: ' + data);
      }
    })
    .catch(error => {
      console.error('Error deleting workout:', error);
      alert('Error deleting workout');
    });
}


function editWorkout(id) {
  const workout = workouts.find(w => w.id == id);
  if (!workout) return;

  workoutName.value = workout.name;
  numberOfSets.value = workout.sets;
  numberOfReps.value = workout.reps;
<<<<<<< HEAD
  weightInput.value = workout.weight || '';

=======
  weightUsed.value = workout.weight;
>>>>>>> 16cf4163d40e0e4eae1a04109d3709ece71bb4c5

  addWorkoutBtn.dataset.editId = id;
  addWorkoutBtn.textContent = 'Save changes';
  addWorkoutBtn.classList.add('editing');

  workoutName.focus();
}
