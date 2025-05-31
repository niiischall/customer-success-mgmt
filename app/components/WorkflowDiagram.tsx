'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, Node, Edge, NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CUSTOMER_SUCCESS_WORKFLOW, WorkflowNode } from '../constants/workflow';
import NodeDetailsModal from './NodeDetailsModal';

function treeToFlow(
  node: WorkflowNode,
  parentId: string | null = null,
  nodes: Node[] = [],
  edges: Edge[] = [],
  level: number = 0,
  posX: number = 0
): { nodes: Node[]; edges: Edge[] } {
  const nodeId = node.id;
  nodes.push({
    id: nodeId,
    data: { label: node.label },
    position: { x: posX * 250, y: level * 100 },
    style: { color: '#2c3e50', fontWeight: 600 },
    type: 'default',
  });
  if (parentId) {
    edges.push({
      id: `${parentId}-${nodeId}`,
      source: parentId,
      target: nodeId,
      type: 'default',
    });
  }
  if (node.children) {
    node.children.forEach((child, idx) => {
      treeToFlow(child, nodeId, nodes, edges, level + 1, posX + idx - (node.children!.length - 1) / 2);
    });
  }
  return { nodes, edges };
}

export default function WorkflowDiagram() {
  const { nodes, edges } = useMemo(() => treeToFlow(CUSTOMER_SUCCESS_WORKFLOW), []);
  const [selectedNode, setSelectedNode] = useState<{ id: string; label: string } | null>(null);
  const [modalPos, setModalPos] = useState<{ x: number; y: number } | null>(null);

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode({ id: String(node.id), label: String(node.data.label) });
    setModalPos({ x: event.clientX, y: event.clientY });
  }, []);

  return (
    <div style={{ width: '100%', height: 600, background: '#f5f8ff', borderRadius: 8 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={onNodeClick}>
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