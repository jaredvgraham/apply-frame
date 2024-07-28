import React from "react";

type JobNotesProps = {
  notes: string[] | undefined;
  isEditing: boolean;
  handleNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const JobNotes = ({ notes, isEditing, handleNotesChange }: JobNotesProps) => {
  return (
    <div className="border-2 border-border p-4 rounded-lg">
      <h3 className="text-lg font-semibold">Notes</h3>
      {isEditing ? (
        <textarea
          name="notes"
          value={notes?.join("\n") || ""}
          onChange={handleNotesChange}
          className="text-base p-2 border-2 border-border rounded-md w-full h-32 bg-transparent text-text"
        />
      ) : notes && notes.length > 0 ? (
        <ul className="list-disc pl-6 space-y-2">
          {notes.map((note, index) => (
            <li key={index} className="text-base">
              {note}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-base">No notes available</p>
      )}
    </div>
  );
};

export default JobNotes;
