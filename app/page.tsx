'use client';

import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { WorkflowState } from './types';

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [workflow] = useState<Partial<WorkflowState>>({
    id: '1',
    title: 'Customer Onboarding',
    description: 'Standard customer onboarding workflow',
    lastModified: new Date(),
  });

  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <Header isEditMode={isEditMode} onModeToggle={() => setIsEditMode(!isEditMode)} />
      <div className="flex">
        <Sidebar />
        <MainContent isEditMode={isEditMode} workflow={workflow} />
      </div>
    </div>
  );
}
