'use client';

import React from 'react';

interface NodeDetailsModalProps {
  open: boolean;
  onClose: () => void;
  nodeData?: { id: string; label: string };
  position?: { x: number; y: number } | null;
}

export default function NodeDetailsModal({ open, onClose, nodeData, position }: NodeDetailsModalProps) {
  if (!open || !nodeData || !position) return null;

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
        <div className="mb-2">
          <span className="font-medium text-[#4a5568]">ID:</span>
          {' '}
          <span className="font-bold text-[#4a5568]">{nodeData.id}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium text-[#4a5568]">Label:</span>
          {' '}
          <span className="font-bold text-[#4a5568]">{nodeData.label}</span>
        </div>
        {/* Add more config fields here as needed */}
      </div>
    </div>
  );
} 