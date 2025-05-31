'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, Node, NodeMouseHandler, OnNodesChange, applyNodeChanges, NodeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CUSTOMER_SUCCESS_WORKFLOW} from '../constants/workflow';
import NodeDetailsModal from './NodeDetailsModal';
import { treeToFlow } from '../utils';


export default function WorkflowDiagram() {
  const { nodes: initialNodes, edges } = useMemo(() => treeToFlow(CUSTOMER_SUCCESS_WORKFLOW), []);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<{ id: string; label: string } | null>(null);
  const [modalPos, setModalPos] = useState<{ x: number; y: number } | null>(null);

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode({ id: String(node.id), label: String(node.data.label) });
    setModalPos({ x: event.clientX, y: event.clientY });
  }, []);

  const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  return (
    <div style={{ width: '100%', height: 600, background: '#f5f8ff', borderRadius: 8 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <NodeDetailsModal
        open={!!selectedNode}
        onClose={() => { setSelectedNode(null); setModalPos(null); }}
        nodeData={selectedNode || undefined}
        position={modalPos}
      />
    </div>
  );
} 