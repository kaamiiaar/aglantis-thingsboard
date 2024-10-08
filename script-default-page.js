function createSequenceElement(sequenceKey, sequence) {
  const sequenceElement = document.createElement('div');
  sequenceElement.classList.add('sequence');
  sequenceElement.id = sequenceKey;

  const title = document.createElement('h3');
  const sequenceName = sequenceKey.charAt(0).toUpperCase() + sequenceKey.slice(1) + ' (' + sequence.pumps.map(pump => pumps[pump].label).join(', ') + ')';
  title.textContent = sequenceName;
  sequenceElement.appendChild(title);

  const setsContainer = document.createElement('div');
  setsContainer.classList.add('sets-container');
  setsContainer.setAttribute('data-sequence', sequenceKey);

  // Create Select All/Deselect All checkbox
  const selectAllContainer = document.createElement('div');
  selectAllContainer.classList.add('select-all-container');

  const selectAllCheckbox = document.createElement('input');
  selectAllCheckbox.type = 'checkbox';
  selectAllCheckbox.classList.add('select-all-checkbox');
  selectAllCheckbox.addEventListener('change', function() {
    const checkboxes = setsContainer.querySelectorAll('.set-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAllCheckbox.checked;
      const setDuration = checkbox.closest('.set').querySelector('.set-duration');
      setDuration.disabled = !checkbox.checked;
    });
  });

  const selectAllLabel = document.createElement('label');
  selectAllLabel.textContent = 'Select All';
  selectAllLabel.classList.add('select-all-label');

  selectAllContainer.appendChild(selectAllCheckbox);
  selectAllContainer.appendChild(selectAllLabel);
  setsContainer.appendChild(selectAllContainer);

  sequence.sets.forEach(set => {
    const setElement = document.createElement('div');
    setElement.classList.add('set');
    setElement.id = set;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('set-checkbox');
    checkbox.addEventListener('change', function() {
      setDuration.disabled = !checkbox.checked;
      if (!checkbox.checked) {
        selectAllCheckbox.checked = false; // Uncheck Select All if any set is unchecked
      }
    });

    const setName = document.createElement('span');
    setName.classList.add('set-name');
    setName.textContent = sets[set].label;

    const setDuration = document.createElement('input');
    setDuration.type = 'number';
    setDuration.classList.add('set-duration');
    setDuration.placeholder = 'Hours';
    setDuration.min = 1;
    setDuration.max = 24;
    setDuration.disabled = true;

    setElement.appendChild(checkbox);
    setElement.appendChild(setName);
    setElement.appendChild(setDuration);
    setElement.draggable = true;
    setElement.addEventListener('dragstart', dragStart);
    setElement.addEventListener('dragend', dragEnd);
    setsContainer.appendChild(setElement);
  });

  setsContainer.addEventListener('dragover', dragOver);
  setsContainer.addEventListener('drop', drop);

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
}


function markSequenceCompleted(sequenceKey) {
  const sequenceElement = document.getElementById(sequenceKey);
  if (sequenceElement) {
      sequenceElement.style.backgroundColor = '#d4edda';
      sequenceElement.style.borderColor = '#c3e6cb';
  }
}

function markSetCompleted(setId) {
  const setElement = document.getElementById(setId);
  if (setElement) {
      setElement.style.backgroundColor = '#d4edda';
      setElement.style.borderColor = '#c3e6cb';
  }
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.classList.add('dragging');
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
}

function dragOver(e) {
  e.preventDefault();
  const container = e.currentTarget;
  const afterElement = getDragAfterElement(container, e.clientY);
  const dropIndicators = document.querySelectorAll('.drop-indicator');
  dropIndicators.forEach(indicator => indicator.remove());

  const dropIndicator = document.createElement('div');
  dropIndicator.classList.add('drop-indicator');

  if (afterElement == null) {
      container.appendChild(dropIndicator);
  } else {
      container.insertBefore(dropIndicator, afterElement);
  }
}

function drop(e) {
  e.preventDefault();
  const setId = e.dataTransfer.getData('text');
  const draggedElement = document.getElementById(setId);
  const dropZone = e.target.closest('.sets-container');
  
  if (dropZone && draggedElement && dropZone.getAttribute('data-sequence') === draggedElement.closest('.sets-container').getAttribute('data-sequence')) {
      const afterElement = getDragAfterElement(dropZone, e.clientY);
      if (afterElement == null) {
          dropZone.appendChild(draggedElement);
      } else {
          dropZone.insertBefore(draggedElement, afterElement);
      }
      
      const sequenceKey = dropZone.getAttribute('data-sequence');
      const sequence = sequences[sequenceKey];
      
      sequence.sets = Array.from(dropZone.children).filter(child => child.classList.contains('set')).map(child => child.id);
  }
  
  const dropIndicators = document.querySelectorAll('.drop-indicator');
  dropIndicators.forEach(indicator => indicator.remove());
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.set:not(.dragging)')];
  
  return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
      } else {
          return closest;
      }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('sequence-container');
  displaySequences(container, sequences, all_sequences[1]);
});

// Expose the functions to be used by the main.js
window.markSequenceCompleted = markSequenceCompleted;
window.markSetCompleted = markSetCompleted;

document.addEventListener('DOMContentLoaded', function() {
  // Check the localStorage for the state
  if (localStorage.getItem('irrigationState') === 'started') {
    document.getElementById('sequence-container-wrapper').style.display = 'none';
    document.getElementById('irrigation-controls').style.display = 'block';
    document.getElementById('irrigation-controls').style.flex = '1';
    document.getElementById('irrigation-controls').style.overflowY = 'auto';
    document.getElementById('irrigation-controls').style.maxWidth = '800px';
  } else {
    document.getElementById('sequence-container-wrapper').style.display = 'block';
    document.getElementById('irrigation-controls').style.display = 'none';
    document.getElementById('sequence-container-wrapper').style.flex = '1';
    document.getElementById('sequence-container-wrapper').style.overflowY = 'auto';
    document.getElementById('sequence-container-wrapper').style.maxWidth = '800px';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Check the localStorage for the state
  if (localStorage.getItem('irrigationState') === 'started') {
    document.getElementById('sequence-container-wrapper').style.display = 'none';
    document.getElementById('irrigation-controls').style.display = 'block';
    document.getElementById('irrigation-controls').style.flex = '1';
    document.getElementById('irrigation-controls').style.overflowY = 'auto';
    document.getElementById('irrigation-controls').style.maxWidth = '800px';
  } else {
    document.getElementById('sequence-container-wrapper').style.display = 'block';
    document.getElementById('irrigation-controls').style.display = 'none';
    document.getElementById('sequence-container-wrapper').style.flex = '1';
    document.getElementById('sequence-container-wrapper').style.overflowY = 'auto';
    document.getElementById('sequence-container-wrapper').style.maxWidth = '800px';
  }
});

function getSelectedSets() {
  const selectedSets = [];
  let allDurationsProvided = true;

  document.querySelectorAll('.set-checkbox:checked').forEach(checkbox => {
    const set = checkbox.closest('.set').id;
    selectedSets.push(set);
    sets[set].selected = 'yes';

    const durationInput = checkbox.closest('.set').querySelector('.set-duration');
    const duration = durationInput.value;

    if (!duration) {
      durationInput.style.borderColor = 'red';
      allDurationsProvided = false;
    } else {
      durationInput.style.borderColor = ''; // Reset the border color if duration is provided
      sets[set].duration = duration;
    }
  });

  if (!allDurationsProvided) {
    alert('You need to provide a duration for any selected set.');
  }

  return allDurationsProvided ? selectedSets : [];
}

// on click of the start irrigation plan button
function showIrrigationControlPanel(selectedSets) {
  const container = document.getElementById('custom-sequence-container');
  container.innerHTML = '';

  selectedSets.forEach(set => {
    const setElement = document.createElement('div');
    setElement.classList.add('custom-set');
    setElement.id = set;

    const setLabel = document.createElement('label');
    setLabel.textContent = sets[set].label;
    setElement.appendChild(setLabel);

    const durationLabel = document.createElement('label');
    durationLabel.textContent = `Duration: ${sets[set].duration} hours`;
    setElement.appendChild(durationLabel);

    const irrigationStatus = document.createElement('label');
    irrigationStatus.textContent = `Status: ${sets[set].irrigationStatus}`;
    setElement.appendChild(irrigationStatus);

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');

    const progressBarFill = document.createElement('div');
    progressBarFill.classList.add('progress-bar-fill');
    progressBarFill.style.width = `${sets[set].progress}%`;
    progressBarFill.textContent = `${sets[set].progress}%`;

    progressBar.appendChild(progressBarFill);
    setElement.appendChild(progressBar);

    container.appendChild(setElement);
  });
}

// event listener for start irrigation button
document.getElementById('start-irrigation-plan').addEventListener('click', function() {
  const selectedSets = getSelectedSets();

  if (selectedSets.length > 0) {
    if (confirm("Are you sure you want to start the irrigation plan?")) {
      showIrrigationControlPanel(selectedSets);
      document.getElementById('sequence-container-wrapper').style.display = 'none';
      document.getElementById('irrigation-controls').style.display = 'block';
      document.getElementById('irrigation-controls').style.flex = '1';
      document.getElementById('irrigation-controls').style.overflowY = 'auto';
      document.getElementById('irrigation-controls').style.maxWidth = '800px';
      localStorage.setItem('irrigationState', 'started');
    }
  }
});


// Clicking on stop irrigation plan button
document.getElementById('stop-irrigation-plan').addEventListener('click', function() {
  document.getElementById('irrigation-controls').style.display = 'none';
  document.getElementById('sequence-container-wrapper').style.display = 'block';
  document.getElementById('sequence-container-wrapper').style.flex = '1';
  document.getElementById('sequence-container-wrapper').style.overflowY = 'auto';
  document.getElementById('sequence-container-wrapper').style.maxWidth = '800px';
  localStorage.setItem('irrigationState', 'stopped');
});

// Map Widget
// Initialize the map
var map = L.map('map').setView([-19.576, 147.31], 14); // Centering on a general coordinate

// Add a tile layer to the map
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri — Source: Esri, DeLorme, NAVTEQ',
    maxZoom: 45
}).addTo(map);

// Add polygons to the map
setsData.forEach((set, index) => {
  const irrigationStatus = sets[set.name].irrigationStatus;
  const color = irrigationStatus === 'on' ? "#0088D1" : irrigationStatus === 'off' ? '#E65200' : 'blue';
  const isSelected = sets[set.name].selected === 'yes';

  L.polygon(set.coordinates, {
    color: isSelected ? 'yellow' : color,
    fillOpacity: isSelected ? 0.5 : 0.3,
    opacity: isSelected ? 1 : 0.6,
    weight: isSelected ? 3 : 1.5
  }).addTo(map)
    .bindPopup(`<b>Set ${index + 1}</b>`)
    .bindTooltip(`s${index + 1}`, { permanent: true, direction: 'center', className: 'plain-text-tooltip' });
});

// Fit the map to the bounds of the polygons with a padding of 50px
map.fitBounds(setsData.map(set => set.coordinates), { padding: [40, 40] });

// Add custom CSS to remove the box and style the text
var style = document.createElement('style');
style.innerHTML = `
.plain-text-tooltip {
  background: none;
  border: none;
  box-shadow: none;
  font-size: 12px; /* Adjust the font size as needed */
  color: white; /* Adjust the text color as needed */
}
`;
document.head.appendChild(style);

// Define custom icons for each device type and status
const iconSize = [22, 22]; // Adjust the size as needed

const pumpOnIcon = L.icon({
  iconUrl: 'path/to/pump-on.png', // Replace with the path to your pump on icon
  iconSize: iconSize,
  iconAnchor: [12.8, 25.6], // Adjust the anchor as needed
  popupAnchor: [0, -25.6] // Adjust the popup anchor as needed
});

const pumpOffIcon = L.icon({
  iconUrl: './icons/pump-off.png', // Replace with the path to your pump off icon
  iconSize: iconSize,
  iconAnchor: [12.8, 25.6], // Adjust the anchor as needed
  popupAnchor: [0, -25.6] // Adjust the popup anchor as needed
});

const wlSensorWetIcon = L.icon({
  iconUrl: './icons/wlsensor-wet.png', // Replace with the path to your WLSensor wet icon
  iconSize: iconSize,
  iconAnchor: [12.8, 25.6], // Adjust the anchor as needed
  popupAnchor: [0, -25.6] // Adjust the popup anchor as needed
});

const wlSensorDryIcon = L.icon({
  iconUrl: './icons/wlsensor-dry.png', // Replace with the path to your WLSensor dry icon
  iconSize: iconSize,
  iconAnchor: [12.8, 25.6], // Adjust the anchor as needed
  popupAnchor: [0, -25.6] // Adjust the popup anchor as needed
});

const valveClosedIcon = L.icon({
  iconUrl: './icons/valve-closed.png', // Replace with the path to your valve closed icon
  iconSize: iconSize,
  iconAnchor: [16, 32], // Adjust the anchor as needed
  popupAnchor: [0, -32] // Adjust the popup anchor as needed
});

const valveOpenLeftIcon = L.icon({
  iconUrl: './icons/valve-open-left.png', // Replace with the path to your valve open left icon
  iconSize: iconSize,
  iconAnchor: [16, 32], // Adjust the anchor as needed
  popupAnchor: [0, -32] // Adjust the popup anchor as needed
});

const valveOpenRightIcon = L.icon({
  iconUrl: './icons/valve-open-right.png', // Replace with the path to your valve open right icon
  iconSize: iconSize,
  iconAnchor: [16, 32], // Adjust the anchor as needed
  popupAnchor: [0, -32] // Adjust the popup anchor as needed
});

// Function to get the appropriate icon based on device type and status
function getIcon(device) {
  switch (device.type) {
    case 'pump':
      return device.status === 'on' ? pumpOnIcon : pumpOffIcon;
    case 'water alert sensor':
      return device.status === 'Wet' ? wlSensorWetIcon : wlSensorDryIcon;
    case 'valve':
      if (device.name.slice(-1) === 'e') {
        return device.status === 'off' ? valveClosedIcon : valveOpenRightIcon;
      } else if (device.name.slice(-1) === 'w') {
        return device.status === 'off' ? valveClosedIcon : valveOpenLeftIcon;
      } else {
        return valveClosedIcon;
      }
    default:
      return null;
  }
}

// Add devices to the map with custom icons
Object.values(devices).forEach(device => {
  L.marker([device.lat, device.long], { icon: getIcon(device) })
    .addTo(map)
    .bindPopup(`<b>${device.label}</b><br>Type: ${device.type}<br>Status: ${device.status}`);
});
