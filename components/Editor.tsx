'use client'

import { useState } from "react";
import { useAutosave } from "react-autosave";
import { updateEntry } from "../utils/api";
import Spinner from "./Spinner";

const Editor = ({entry}: {
  entry: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string;
  }
}) => {
  const [value, setValue ]= useState(entry.content)
  const [currentEntry, setEntry ]= useState(entry)
  const [isSaving, setIsSaving ]= useState(false)
  
  useAutosave({
    data: value,
    onSave: async (_text) => {
      if (_text === currentEntry.content) return
      setIsSaving(true)

      const { data } = await updateEntry(entry.id, _text)

      setEntry(data)
      setIsSaving(false)
    },
  })
  return (
    <div className="w-full h-full relative">
      <div className="absolute left-0 top-0 p-2">
        {isSaving ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor