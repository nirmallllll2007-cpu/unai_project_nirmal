// 1. Select all block items and the workflow canvas
const blocks = document.querySelectorAll(".block");
const canvas = document.querySelector("#canvas");

// 2. Add a workflow step to the canvas when a block is clicked
blocks.forEach((block) => {
  block.addEventListener("click", () => {
    if (!canvas) return;

    const blockType = block.dataset.type || block.textContent.trim();

    // Create a new step element
    const step = document.createElement("div");
    step.className = "workflow-step";
    step.textContent = `${blockType} (click to remove)`;

    // Remove the step when clicked
    step.addEventListener("click", () => {
      step.remove();
    });

    canvas.appendChild(step);
  });
});