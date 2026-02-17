import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import {
  DndContext,
  closestCorners,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [activity, setActivity] = useState([]);

  const addTask = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: taskInput,
      status: "todo",
    };

    setTasks([...tasks, newTask]);
    setActivity([`Task "${taskInput}" created`, ...activity]);
    setTaskInput("");
  };

  const deleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTasks(tasks.filter((t) => t.id !== id));
    setActivity([`Task "${task.title}" deleted`, ...activity]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );

    setActivity([`Task moved to ${newStatus}`, ...activity]);
  };

  const Column = ({ title, status }) => {
    const { setNodeRef } = useDroppable({ id: status });

    return (
      <div
        ref={setNodeRef}
        className="bg-zinc-900 p-4 rounded-xl flex-1 min-h-[400px]"
      >
        <h2 className="text-xl font-semibold mb-4 text-white">
          {title}
        </h2>

        <div className="space-y-3">
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      </div>
    );
  };

  const TaskCard = ({ task }) => {
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
        {...listeners}
        {...attributes}
        className="bg-zinc-800 text-white p-3 rounded-lg cursor-grab flex justify-between items-center"
      >
        <span>{task.title}</span>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-400 text-sm"
        >
          ✕
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <div className="pt-28 px-6 max-w-7xl mx-auto">
        {/* Add Task Section */}
        <div className="flex gap-3 mb-10">
          <input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter new task..."
            className="flex-1 px-4 py-2 rounded-lg text-white border-2 border-white"
          />
          <button
            onClick={addTask}
            className="bg-emerald-500 px-6 py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            Add Task
          </button>
        </div>

        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col gap-10">
            
            {/* Row 1 → 3 Columns */}
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <Column title="Todo" status="todo" />
              <Column title="Doing" status="doing" />
              <Column title="Done" status="done" />
            </div>

            {/* Row 2 → Activity Log */}
            <div className="w-full bg-zinc-900 p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Activity Log
              </h2>

              <div className="space-y-2 text-sm max-h-60 overflow-y-auto">
                {activity.length === 0 && (
                  <p className="text-zinc-400">
                    No activity yet.
                  </p>
                )}

                {activity.map((log, index) => (
                  <p key={index} className="text-white">
                    • {log}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default Home;