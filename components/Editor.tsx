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
    analysis: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      entryId: string;
      mood: string;
      summary: string;
      color: string;
      negative: boolean;
      subject: string;
    } | null
  }
}) => {
  const [value, setValue ]= useState(entry.content)
  const [currentEntry, setEntry ]= useState(entry)
  const [isSaving, setIsSaving ]= useState(false);

  const {
    mood,
    summary,
    subject,
    color,
    negative
  } = currentEntry.analysis || {};

  const analysisData = [
    {
      name: 'Summary',
      value: summary,
    },
    {
      name: 'Subject',
      value: subject,
    },
    {
      name: 'Mood',
      value: mood,
    },
    {
      name: 'Negative',
      value: currentEntry.analysis ? (negative ? 'True' :'False') : '',
    }
  ]

  useAutosave({
    data: value,
    onSave: async (_text) => {
      if (_text === currentEntry.content) return
      setIsSaving(true)

      const data = await updateEntry(entry.id, _text)

      setEntry(data)
      setIsSaving(false)
    },
  })
  return (
    <>
      <div className="col-span-2">
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
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{backgroundColor: color}}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map(item => (
              <li key={item.name} className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="pl-1 text-right">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Editor