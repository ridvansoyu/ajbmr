"use client";
import React, { useState } from 'react';

interface ManuscriptSubmissionFormProps {
  onSubmit: (data: FormData) => void;
}

export default function ManuscriptSubmissionForm({ onSubmit }: ManuscriptSubmissionFormProps) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    if (file) data.append('file', file);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Manuscript File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
          className="w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}


