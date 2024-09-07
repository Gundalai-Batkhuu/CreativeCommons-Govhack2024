import React, { useState } from 'react';
import { ApiEndpoint } from '@/app/enums';

interface ManualDocumentUploaderProps {
  userId: string;
}

export const ManualDocumentUploader = ({ userId }: ManualDocumentUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [message, setMessage] = useState('');
  const apiUrl = ApiEndpoint.MANUAL_DOCUMENT_UPLOAD;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!file && !link) {
      setMessage('Please provide either a file or a link');
      return;
    }

    const formData = new FormData();
    if (file) formData.append('file', file);
    if (link) formData.append('link', link);
    formData.append('user_id', userId);
    if (documentId) formData.append('document_id', documentId);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage(`${data.message} You can upload another file if needed.`);
      // Clear only the file input after successful upload
      setFile(null);
      if (event.target instanceof HTMLFormElement) {
        const fileInput = event.target.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('An error occurred while uploading the document');
      }
    }
  };

  return (
    <div className="w-full max-w-md p-4 space-y-5">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-6">
          <label htmlFor="file" className="block text-xs font-medium mb-1">
            File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="w-full bg-background text-foreground border border-input rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          {file && <p className="mt-1 text-xs text-muted-foreground">{file.name}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="link" className="block text-xs font-medium mb-1">
            Link (optional)
          </label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full bg-background text-foreground border border-input rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            placeholder="https://example.com"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="documentId" className="block text-xs font-medium mb-1">
            Document ID (optional)
          </label>
          <input
            type="text"
            id="documentId"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            className="w-full bg-background text-foreground border border-input rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Upload File
        </button>
      </form>
      {message && (
        <div className={`mt-4 p-4 border rounded-md text-sm ${
          message.startsWith('Error') 
            ? 'bg-destructive/15 border-destructive text-destructive' 
            : 'bg-primary/15 border-primary text-primary'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};