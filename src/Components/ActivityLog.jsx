import React from "react";

const ActivityLog = ({ activity }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-black">
        Activity Log
      </h2>

      {activity.length === 0 ? (
        <p className="text-gray-500">No activity yet.</p>
      ) : (
        activity.map((log, index) => (
          <p key={index} className="text-sm text-gray-700">
            • {log}
          </p>
        ))
      )}
    </div>
  );
};

export default ActivityLog;