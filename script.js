// 1. Grab the workflow blocks, canvas, and live step counter element
const blocks = document.querySelectorAll(".block");
const canvas = document.querySelector("#canvas");
const stepCountEl = document.querySelector("#step-count");

// 2. Keep the live step counter synced with the steps currently in #canvas
function updateStepCount() {
  if (!canvas || !stepCountEl) return;
  const totalSteps = canvas.querySelectorAll(".workflow-step").length;
  stepCountEl.textContent = `Total Steps: ${totalSteps}`;
}

// 3. Add a step when a block is clicked, and allow removing a step on click
blocks.forEach((block) => {
  block.addEventListener("click", () => {
    if (!canvas) return;

    const blockType = block.dataset.type || block.textContent.trim();

    const step = document.createElement("div");
    step.className = "workflow-step";
    step.textContent = `${blockType} (click to remove)`;

    step.addEventListener("click", () => {
      step.remove();
      updateStepCount();
    });

    canvas.appendChild(step);
    updateStepCount();
  });
});

// 4. Initialize the counter on load
updateStepCount();