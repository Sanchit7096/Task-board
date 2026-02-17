import React, { useState, useEffect } from "react";

const TaskModal = ({ isOpen, onClose, onSave, editingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Low");
      setDueDate(editingTask.dueDate || "");
      setTags(editingTask.tags?.join(", ") || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("Low");
      setDueDate("");
      setTags("");
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onSave({
      id: editingTask?.id || Date.now().toString(),
      title,
      description,
      priority,
      dueDate,
      tags: tags
        ? tags.split(",").map((tag) => tag.trim())
        : [],
      status: editingTask?.status || "todo",
      createdAt: editingTask?.createdAt || new Date().toISOString(),
    });
      setTitle("");
  setDescription("");
  setPriority("Low");
  setDueDate("");
  setTags("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl">

        <h2 className="text-xl font-semibold text-black">
          {editingTask ? "Edit Task" : "Create Task"}
        </h2>

        {/* Title */}
        <input
          className="w-full border border-gray-300 p-2 rounded text-black placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="w-full border border-gray-300 p-2 rounded text-black placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Priority */}
        <select
          className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-emerald-500"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none focus:border-emerald-500"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Tags */}
        <input
          className="w-full border border-gray-300 p-2 rounded text-black placeholder-gray-400 focus:outline-none focus:border-emerald-500"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-black hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default TaskModal;