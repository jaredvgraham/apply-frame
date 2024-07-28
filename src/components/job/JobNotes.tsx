import React, { useState } from "react";

type JobNotesProps = {
  notes: string[] | undefined;
  isEditing: boolean;
  handleNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const JobNotes = ({ notes, isEditing, handleNotesChange }: JobNotesProps) => {
  const [newNote, setNewNote] = useState("");
  const [editedNotes, setEditedNotes] = useState(notes || []);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedNotes = [...editedNotes, newNote.trim()];
      setEditedNotes(updatedNotes);
      setNewNote("");
      handleNotesChange({
        target: {
          name: "notes",
          value: updatedNotes.join("\n"),
        },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  };

  const handleRemoveNote = (index: number) => {
    const updatedNotes = editedNotes.filter((_, i) => i !== index);
    setEditedNotes(updatedNotes);
    handleNotesChange({
      target: {
        name: "notes",
        value: updatedNotes.join("\n"),
      },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  return (
    <div className="border-2 border-border p-4 rounded-lg bg-backgroundAlt shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Notes</h3>
      {isEditing ? (
        <div>
          <textarea
            name="notes"
            value={editedNotes.join("\n")}
            onChange={(e) => {
              const newNotes = e.target.value.split("\n");
              setEditedNotes(newNotes);
              handleNotesChange(e);
            }}
            placeholder="Write your notes here..."
            className="text-base p-2 border-2 border-border rounded-md w-full h-32 bg-gray-100 text-black"
          />
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
              className="text-base p-2 border-2 border-border rounded-md flex-1 bg-gray-100 text-black"
            />
            <button
              onClick={handleAddNote}
              className="ml-2 bg-blue-500 text-white py-1 px-3 rounded-md"
            >
              Add Note
            </button>
          </div>
          {editedNotes.length > 0 && (
            <ul className="list-disc pl-6 mt-2 space-y-2">
              {editedNotes.map((note, index) => (
                <li key={index} className="text-base flex justify-between">
                  {note}
                  <button
                    onClick={() => handleRemoveNote(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
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
