import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faArrowLeft,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

type JobHeaderProps = {
  companyName: string;
  isEditing: boolean;
  handleSave: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
  handleCancel: () => void;
  router: any;
};

const JobHeader = ({
  companyName,
  isEditing,
  handleSave,
  handleEdit,
  handleDelete,
  handleCancel,
  router,
}: JobHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-4xl font-bold">{companyName}</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => router.push("/jobs")}
          className="bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-primary-dark transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Jobs
        </button>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 transition"
            >
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white py-2 px-4 rounded-md shadow hover:bg-gray-700 transition"
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="bg-secondary text-white py-2 px-4 rounded-md shadow hover:bg-secondary-dark transition"
            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded-md shadow hover:bg-red-700 transition"
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JobHeader;
