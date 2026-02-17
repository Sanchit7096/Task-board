import React from "react";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: task.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow mb-3 text-black"
    >
      <div {...listeners} {...attributes} className="cursor-grab font-medium">
        {task.title}
      </div>

      <p className="text-sm text-gray-600">{task.description}</p>

      <div className="text-xs mt-2">
        <span className="mr-2">Priority: {task.priority}</span>
        {task.dueDate && <span>Due: {task.dueDate}</span>}
      </div>

      <div className="flex gap-3 mt-3">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;