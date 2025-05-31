'use client';

import React, { useState, useEffect } from 'react';

interface NodeDetailsModalProps {
  open: boolean;
  onClose: () => void;
  nodeData?: { id: string; label: string; type?: string };
  position?: { x: number; y: number } | null;
  isEdit?: boolean;
  onSave?: (updated: { id: string; label: string; type: string }) => void;
}

export default function NodeDetailsModal({ open, onClose, nodeData, position, isEdit = false, onSave }: NodeDetailsModalProps) {
  const [editId, setEditId] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [editType, setEditType] = useState('action');

  useEffect(() => {
    if (nodeData) {
      setEditId(nodeData.id);
      setEditLabel(nodeData.label);
      setEditType(nodeData.type || 'action');
    }
  }, [nodeData, isEdit]);

  if (!open || !nodeData || !position) return null;

  // Extract type from label if not directly provided
  let nodeType = nodeData.type;
  if (!nodeType && nodeData.label) {
    const match = nodeData.label.match(/\(([^)]+)\)$/);
    if (match) nodeType = match[1];
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] absolute pointer-events-auto"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -10px)',
        }}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-4 text-[#2c3e50]">Node Details</h3>
        {isEdit ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (onSave) onSave({ id: editId, label: editLabel, type: editType });
            }}
          >
            <div className="mb-2">
              <label className="font-medium text-[#4a5568] block mb-1">ID:</label>
              <input
                className="border rounded px-2 py-1 w-full text-[#2c3e50]"
                value={editId}
                onChange={e => setEditId(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-medium text-[#4a5568] block mb-1">Label:</label>
              <input
                className="border rounded px-2 py-1 w-full text-[#2c3e50]"
                value={editLabel}
                onChange={e => setEditLabel(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-2">
              <label className="font-medium text-[#4a5568] block">Node Type:</label>
              <span className="font-bold text-[#4a5568]">{nodeType}</span>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-2">
              <span className="font-medium text-[#4a5568]">ID:</span>{' '}
              <span className="font-bold text-[#4a5568]">{nodeData.id}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-[#4a5568]">Label:</span>{' '}
              <span className="font-bold text-[#4a5568]">{nodeData.label}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-[#4a5568]">Node Type:</span>{' '}
              <span className="font-bold text-[#4a5568]">{nodeType}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 