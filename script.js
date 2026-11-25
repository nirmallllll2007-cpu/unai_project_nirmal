// 1. Grab page elements
const blocks = document.querySelectorAll(".block");
const canvas = document.querySelector("#canvas");
const stepCountEl = document.querySelector("#step-count");
const clearBtn = document.querySelector("#clear-btn");
const statusMsgEl = document.querySelector("#status-msg");
const nameInput = document.querySelector("#workflow-name-input");
const saveBtn = document.querySelector("#save-btn");
const savedListEl = document.querySelector("#saved-workflows-list");

const STORAGE_KEY = "unai_workflows_v1";

function setStatusMessage(message) {
  if (!statusMsgEl) return;
  statusMsgEl.textContent = message;
}

function updateStepCount() {
  if (!canvas || !stepCountEl) return;
  const totalSteps = canvas.querySelectorAll(".workflow-step").length;
  stepCountEl.textContent = `Total Steps: ${totalSteps}`;
}

// Helper: read all steps currently on the canvas as an array of block types
function getCurrentSteps() {
  if (!canvas) return [];
  const stepEls = canvas.querySelectorAll(".workflow-step");
  return Array.from(stepEls).map((el) => el.dataset.type || el.textContent.replace(" (click to remove)", "").trim());
}

// Helper: create a clickable step element and add it to #canvas
function addStepToCanvas(blockType) {
  if (!canvas) return;

  const step = document.createElement("div");
  step.className = "workflow-step";
  step.dataset.type = blockType;
  step.textContent = `${blockType} (click to remove)`;

  step.addEventListener("click", () => {
    step.remove();
    updateStepCount();
    setStatusMessage("Removed one step.");
  });

  canvas.appendChild(step);
}

// Clear all steps on canvas
function clearWorkflow() {
  if (!canvas) return;

  const steps = canvas.querySelectorAll(".workflow-step");
  if (steps.length === 0) {
    setStatusMessage("Workflow is already empty.");
    return;
  }

  steps.forEach((step) => step.remove());
  updateStepCount();
  setStatusMessage("Workflow cleared.");
}

// Read workflows safely from localStorage
function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    setStatusMessage("Could not read saved workflows.");
    return [];
  }
}

// Write workflows safely to localStorage
function saveRecords(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (err) {
    setStatusMessage("Could not save workflow to browser storage.");
    return false;
  }
}

// CREATE: Save current workflow as a new record
function createWorkflow() {
  const name = nameInput ? nameInput.value.trim() : "";
  const steps = getCurrentSteps();

  if (!name) {
    setStatusMessage("Please enter a workflow name before saving.");
    return;
  }

  if (steps.length === 0) {
    setStatusMessage("Add at least one step before saving a workflow.");
    return;
  }

  const records = loadRecords();
  const newRecord = {
    id: Date.now(),
    name: name,
    steps: steps,
    stepCount: steps.length,
    createdAt: new Date().toLocaleString()
  };

  records.push(newRecord);
  if (saveRecords(records)) {
    if (nameInput) nameInput.value = "";
    renderSavedWorkflows();
    setStatusMessage(`Saved "${newRecord.name}".`);
  }
}

// READ: Load a saved record back onto #canvas
function loadWorkflowById(id) {
  const records = loadRecords();
  const found = records.find((item) => item.id === id);
  if (!found || !canvas) return;

  canvas.innerHTML = "";
  found.steps.forEach((blockType) => addStepToCanvas(blockType));
  if (nameInput) nameInput.value = found.name;
  updateStepCount();
  setStatusMessage(`Loaded "${found.name}".`);
}

// UPDATE: Rename a saved record or overwrite its steps with current canvas steps
function updateWorkflowById(id) {
  const records = loadRecords();
  const index = records.findIndex((item) => item.id === id);
  if (index === -1) return;

  const currentName = records[index].name;
  const updatedName = prompt("Enter new workflow name:", currentName);
  if (updatedName === null) return;

  const cleanName = updatedName.trim();
  if (!cleanName) {
    setStatusMessage("Workflow name cannot be empty.");
    return;
  }

  const currentSteps = getCurrentSteps();
  records[index].name = cleanName;
  if (currentSteps.length > 0) {
    records[index].steps = currentSteps;
    records[index].stepCount = currentSteps.length;
  }

  if (saveRecords(records)) {
    renderSavedWorkflows();
    setStatusMessage(`Updated "${cleanName}".`);
  }
}

// DELETE: Remove a saved record
function deleteWorkflowById(id) {
  const records = loadRecords();
  const target = records.find((item) => item.id === id);
  const filtered = records.filter((item) => item.id !== id);

  if (saveRecords(filtered)) {
    renderSavedWorkflows();
    setStatusMessage(target ? `Deleted "${target.name}".` : "Workflow deleted.");
  }
}

// Render saved workflow cards on screen
function renderSavedWorkflows() {
  if (!savedListEl) return;
  const records = loadRecords();
  savedListEl.innerHTML = "";

  if (records.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "No saved workflows yet.";
    savedListEl.appendChild(emptyLi);
    return;
  }

  records.forEach((record) => {
    const li = document.createElement("li");
    li.className = "saved-item";

    const titleEl = document.createElement("strong");
    titleEl.textContent = record.name;

    const metaEl = document.createElement("div");
    metaEl.textContent = `Steps (${record.stepCount}): ${record.steps.join(" -> ")}`;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "saved-actions";

    const loadBtn = document.createElement("button");
    loadBtn.type = "button";
    loadBtn.textContent = "Load";
    loadBtn.addEventListener("click", () => loadWorkflowById(record.id));

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Update";
    editBtn.addEventListener("click", () => updateWorkflowById(record.id));

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteWorkflowById(record.id));

    actionsDiv.append(loadBtn, editBtn, delBtn);
    li.append(titleEl, metaEl, actionsDiv);
    savedListEl.appendChild(li);
  });
}

// Connect block clicks
blocks.forEach((block) => {
  block.addEventListener("click", () => {
    const blockType = block.dataset.type || block.textContent.trim();
    addStepToCanvas(blockType);
    updateStepCount();
    setStatusMessage("");
  });
});

// Connect buttons
if (clearBtn) {
  clearBtn.addEventListener("click", clearWorkflow);
}

if (saveBtn) {
  saveBtn.addEventListener("click", createWorkflow);
}

// Initial state on page load
updateStepCount();
renderSavedWorkflows();