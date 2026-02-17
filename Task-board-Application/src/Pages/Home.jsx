import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import TaskModal from "../Components/TaskModel";
import Column from "../Components/Column";
import BoardControls from "../Components/BoardControls";
import ActivityLog from "../Components/ActivityLog";
import { DndContext, closestCorners } from "@dnd-kit/core";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [activity, setActivity] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const saveTask = (taskData) => {
    const exists = tasks.find((t) => t.id === taskData.id);

    if (exists) {
      setTasks(tasks.map((t) => (t.id === taskData.id ? taskData : t)));
      setActivity((prev) => [`Task updated`, ...prev]);
    } else {
      setTasks([...tasks, taskData]);
      setActivity((prev) => [`Task created`, ...prev]);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    setActivity((prev) => [`Task deleted`, ...prev]);
  };

  const resetBoard = () => {
    if (window.confirm("Reset entire board?")) {
      setTasks([]);
      localStorage.removeItem("tasks");
      setActivity([]);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    setTasks(
      tasks.map((task) =>
        task.id === active.id ? { ...task, status: over.id } : task
      )
    );

    setActivity((prev) => [`Task moved`, ...prev]);
  };

  const processedTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) =>
      priorityFilter === "All" ? true : task.priority === priorityFilter
    )
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <NavBar />

      <div className="pt-28 px-6 max-w-7xl mx-auto space-y-6">

        <BoardControls
          search={search}
          setSearch={setSearch}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          onCreate={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          onReset={resetBoard}
        />

        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6">
            <Column
              title="Todo"
              status="todo"
              tasks={processedTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
              onDelete={deleteTask}
            />
            <Column
              title="Doing"
              status="doing"
              tasks={processedTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
              onDelete={deleteTask}
            />
            <Column
              title="Done"
              status="done"
              tasks={processedTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
              onDelete={deleteTask}
            />
          </div>
        </DndContext>

        <ActivityLog activity={activity} />

      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Home;