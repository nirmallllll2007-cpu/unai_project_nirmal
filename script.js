// 1. Select the elements we need from the page
const blocks = document.querySelectorAll(".block");
const canvas = document.querySelector("#canvas");
const stepCountEl = document.querySelector("#step-count");
const clearBtn = document.querySelector("#clear-btn");
const statusMsgEl = document.querySelector("#status-msg");

// Show a short status message to the user
function setStatusMessage(message) {
  if (!statusMsgEl) return;
  statusMsgEl.textContent = message;
}

// Count how many workflow steps are currently inside #canvas and update the text
function updateStepCount() {
  if (!canvas || !stepCountEl) return;
  const totalSteps = canvas.querySelectorAll(".workflow-step").length;
  stepCountEl.textContent = `Total Steps: ${totalSteps}`;
}

// Clear all steps, or show a message if there are already 0 steps
function clearWorkflow() {
  if (!canvas) return;

  const steps = canvas.querySelectorAll(".workflow-step");

  if (steps.length === 0) {
    setStatusMessage("Workflow is already empty.");
    return;
  }

  steps.forEach((step) => {
    step.remove();
  });

  updateStepCount();
  setStatusMessage("Workflow cleared.");
}

// 2. When a block is clicked, create a step inside #canvas
blocks.forEach((block) => {
  block.addEventListener("click", () => {
    if (!canvas) return;

    const blockType = block.dataset.type || block.textContent.trim();

    const step = document.createElement("div");
    step.className = "workflow-step";
    step.textContent = `${blockType} (click to remove)`;

    // Clicking an individual step removes only that step
    step.addEventListener("click", () => {
      step.remove();
      updateStepCount();
      setStatusMessage("Removed one step.");
    });

    canvas.appendChild(step);
    updateStepCount();
    setStatusMessage("");
  });
});

// 3. Connect the Clear Workflow button
if (clearBtn) {
  clearBtn.addEventListener("click", clearWorkflow);
}

// 4. Set the initial step count when the page loads
updateStepCount();