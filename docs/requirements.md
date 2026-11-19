# Project Requirements: Visual Workflow Builder
## Functional Requirements
- The user can drag blocks onto a canvas.
- The user can connect blocks with lines.
- The user can edit a block's settings in a side panel.
- The user can save and load workflow.

## Non-Functional Requirements
- Easy for beginners to use without coding.
- The canvas stays smooth while dragging and zooming.
- API keys stay on the backend and are never exposed.
- Saved workflows are never lost.

## User Requirements
- Users want to build automations without writing code.
- Users want to see results quickly.
- Users want their work saved safely.

## Feature Breakdown
### Feature 1: Drag-and-Drop Canvas
- Purpose: Its purpose is to give users a space to build workflows visually.
- Input: The input is the user dragging a block onto the canvas.
- Processing: The app places the block where it was dropped.
- Output: The output is that the block appears on the canvas.

### Feature 2: Node Library
- Purpose: Give users a list of blocks to choose from.
- Input: The user opens the library and picks a block.
- Processing: The app shows the block types: trigger, action, condition and AI.
- Output: The chosen block is ready to drop onto the canvas.

### Feature 3: Connecting blocks
- Purpose: Let users link blocks together to form a workflow.
- Input: The user drags a line from one block to another.
- Processing: The app stores the connection between the two blocks.
- Output: A line appears on the canvas joining the blocks.

### Feature 4: Settings Panel
- Purpose: Let users change a block's settings.
- Input: The user clicks a block and edits its fields.
- Processing: The app updates that block's saved data.
- Output: The block shows its new settings.

### Feature 5: Save and Load Workflows
- Purpose: Keep the user's work so it is never lost.
- Input: The user clicks Save, or opens a saved workflow.
- Processing: The app turns the workflow into JSON and stores it, or reads it back.
- Output: The workflow is saved, or appears again on the canvas.

## Module Breakdown
- Canvas Module: the drag-and-drop workspace.
- Node Library Module: the list of blocks.
- Connection Module: links between blocks.
- Settings Panel Module: editing a block.
- Storage Module: saving and loading.

## Feature Priorities
### Must Have
- Drag-and-Drop Canvas
- Node Library
- Connecting Blocks
- Save and Load Workflows

### Should Have
- Settings Panel

### Could Have
- Workflow templates
- Duplicate and version workflows

## Development Tasks
### Module 1: Canvas Module
1. Set up the React and React Flow project.
2. Create the empty canvas area.
3. Add zoom and pan controls.
4. Enable dragging blocks onto the canvas.
5. Test that blocks stay where they are dropped.

### Module 2: Node Library Module
1. Design the block list panel.
2. Create the trigger, action, condition and AI block types.
3. Let users drag a block from the list onto the canvas.
4. Test that every block type appears and works.

### Module 3: Connection Module
1. Design how a connecting line looks.
2. Let users drag a line from one block to another.
3. Store each connection between blocks.
4. Test connecting and disconnecting blocks.

### Module 4: Settings Panel Module
1. Design the side panel layout.
2. Show the selected block's fields in the panel.
3. Update the block's data when a field changes.
4. Test editing different block types.

### Module 5: Storage Module
1. Turn the workflow into JSON.
2. Save the JSON to the database.
3. Load a saved workflow back onto the canvas.
4. Test saving and loading with a sample workflow.