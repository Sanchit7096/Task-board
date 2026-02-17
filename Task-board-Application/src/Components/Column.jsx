import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ title, status, tasks, onEdit, onDelete }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 p-4 rounded-xl flex-1 min-h-[400px]"
    >
      <h2 className="text-lg font-semibold mb-4 text-black">{title}</h2>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default Column;