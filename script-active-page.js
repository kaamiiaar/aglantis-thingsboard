function createSequenceElement(sequenceKey, sequence) {
  const sequenceElement = document.createElement('div');
  sequenceElement.classList.add('sequence');
  sequenceElement.id = sequenceKey;

  const title = document.createElement('h3');
  const sequenceName = sequenceKey.charAt(0).toUpperCase() + sequenceKey.slice(1) + ' (' + sequence.pumps.map(pump => pumps[pump].label).join(', ') + ')';
  title.textContent = sequenceName;
  sequenceElement.appendChild(title);

  // Add Estimated Time Completion (ETC) at sequence level
  const etc = document.createElement('span');
  etc.classList.add('sequence-etc');
  etc.textContent = `ETC: ${calculateETC(sequence)}`;  // Assuming a calculateETC function exists
  sequenceElement.appendChild(etc);

  // Sequence Level Controls: Pause, Play, Skip
  const controls = document.createElement('div');
  controls.classList.add('sequence-controls');

  const pauseButton = document.createElement('button');
  pauseButton.textContent = '||';
  pauseButton.classList.add('pause-button');
  pauseButton.addEventListener('click', () => togglePausePlay(sequenceKey, pauseButton));

  const skipButton = document.createElement('button');
  skipButton.textContent = '>>';
  skipButton.classList.add('skip-button');
  skipButton.addEventListener('click', () => skipSequence(sequenceKey));

  controls.appendChild(pauseButton);
  controls.appendChild(skipButton);
  sequenceElement.appendChild(controls);

  const setsContainer = document.createElement('div');
  setsContainer.classList.add('sets-container');
  setsContainer.setAttribute('data-sequence', sequenceKey);

  sequence.sets.forEach(set => {
      const setElement = document.createElement('div');
      setElement.classList.add('set');
      setElement.id = set;

      const setName = document.createElement('span');
      setName.classList.add('set-name');
      setName.textContent = sets[set].label;

      // Set Level Controls: Progress Bar, Skip, Change Duration
      const setControls = document.createElement('div');
      setControls.classList.add('set-controls');
 
      // Create the progress bar with current duration and progress percentage
      const progressBar = document.createElement('div');
      progressBar.classList.add('progress-bar');
      const progressBarFill = document.createElement('div');
      progressBarFill.classList.add('progress-bar-fill');

      // Calculate progress percentage and display it along with current duration
      const progressPercentage = sets[set].progress;
      const currentDuration = sets[set].duration; // Assuming this is the elapsed duration so far
      const totalDuration = calculateTotalDuration(set); // Assuming a function to get the total duration of the set
      const completedDuration = (progressPercentage / 100) * totalDuration;

      progressBarFill.style.width = `${progressPercentage}%`;
      progressBarFill.textContent = `${progressPercentage}% - ${completedDuration}/${totalDuration} hours`;

      progressBar.appendChild(progressBarFill);

      const skipSetButton = document.createElement('button');
      skipSetButton.textContent = '>>';
      skipSetButton.classList.add('skip-set-button');
      skipSetButton.addEventListener('click', () => skipSet(set));

      const changeDurationButton = document.createElement('button');
      changeDurationButton.textContent = 'Change Duration';
      changeDurationButton.classList.add('change-duration-button');
      changeDurationButton.addEventListener('click', () => changeDuration(set));

      setControls.appendChild(progressBar);
      setControls.appendChild(skipSetButton);
      setControls.appendChild(changeDurationButton);

      setElement.appendChild(setName);
      setElement.appendChild(setControls);
      setsContainer.appendChild(setElement);
  });

  sequenceElement.appendChild(setsContainer);

  if (sequence.children.length > 0) {
      const childrenContainer = document.createElement('div');
      childrenContainer.classList.add('children');
      sequence.children.forEach(childKey => {
          const childElement = createSequenceElement(childKey, sequences[childKey]);
          childrenContainer.appendChild(childElement);
      });
      sequenceElement.appendChild(childrenContainer);
  }

  return sequenceElement;
}

function displaySequences(container, sequences, sequenceKey) {
  const sequence = sequences[sequenceKey];
  const sequenceElement = createSequenceElement(sequenceKey, sequence);
  container.appendChild(sequenceElement);

  // Display the overall ETC at the top of the plan
  const etcTop = document.createElement('h2');
  etcTop.textContent = `Estimated Time Completion: ${calculateETCForPlan()}`; // Assuming a calculateETCForPlan function exists
  container.prepend(etcTop);
}

// Functions to handle Pause/Play, Skip, and Change Duration
function togglePausePlay(sequenceKey, button) {
  const isPaused = button.textContent === '||';
  button.textContent = isPaused ? '▶' : '||';
  // Logic to pause/play the sequence
}

function skipSequence(sequenceKey) {
  // Logic to skip the sequence
}

function skipSet(setId) {
  // Logic to skip the set
}

function changeDuration(setId) {
  // Logic to change the duration of the set
}

// Assuming functions to calculate ETC and total duration
function calculateETC(sequence) {
  // Implement logic to calculate ETC for a sequence
}

function calculateETCForPlan() {
  // Implement logic to calculate overall ETC for the plan
}

function calculateTotalDuration(setId) {
  // Implement logic to get the total duration of the set
  // For this example, I'll assume sets[setId].totalDuration holds the total duration
  return sets[setId].totalDuration || 24;  // Assuming default 24 hours if not specified
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('sequence-container');
  displaySequences(container, sequences, all_sequences[1]);
});

// Expose the functions to be used by the main.js
window.markSequenceCompleted = markSequenceCompleted;
window.markSetCompleted = markSetCompleted;
