'use client';

import { WorkflowState } from '../types';
import { COLORS } from '../constants';

interface MainContentProps {
  isEditMode: boolean;
  workflow?: Partial<WorkflowState>;
}

export default function MainContent({ isEditMode, workflow }: MainContentProps) {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        <div className={`bg-white rounded-lg shadow-sm border border-[${COLORS.PRIMARY}] p-6`}>
          <h2 className={`text-lg font-medium text-[${COLORS.TEXT_PRIMARY}] mb-4`}>
            {isEditMode ? 'Edit Workflow' : 'View Workflow'}
          </h2>
          <p className={`text-[${COLORS.TEXT_SECONDARY}]`}>
            {isEditMode
              ? 'You are in edit mode. You can modify the workflow here.'
              : 'You are in view mode. You can view the workflow here.'}
          </p>
          {workflow?.lastModified && (
            <p className="text-sm text-gray-500 mt-4">
              Last modified: {workflow.lastModified.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </main>
  );
} 