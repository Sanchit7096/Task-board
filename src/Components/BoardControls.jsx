import React from "react";

const BoardControls = ({
  search,
  setSearch,
  priorityFilter,
  setPriorityFilter,
  onCreate,
  onReset,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <input
        placeholder="Search..."
        className="border p-2 rounded text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded text-black"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button
        onClick={onCreate}
        className="bg-emerald-600 text-white px-4 py-2 rounded"
      >
        + Create Task
      </button>

      <button
        onClick={onReset}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Reset Board
      </button>
    </div>
  );
};

export default BoardControls;