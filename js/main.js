const draggables = document.querySelectorAll(".list");
const containers = document.querySelectorAll(".items-list");

//start foreach to drag and drop
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

//array to append the card into container
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = [...document.querySelectorAll(".dragging")];
    if (afterElement == null) {
      container.appendChild(draggable[0]);
    } else {
      container.insertBefore(draggable[0], afterElement);
    }
  });
});

//function to know
function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".list:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
