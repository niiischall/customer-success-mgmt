'use client';

import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { ReactFlow, Background, Controls, Node, NodeMouseHandler, OnNodesChange, applyNodeChanges, NodeChange, ReactFlowInstance, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CUSTOMER_SUCCESS_WORKFLOW } from '../constants/workflow';
import NodeDetailsModal from './NodeDetailsModal';
import { Settings2, MinusSquare, PlusSquare } from 'lucide-react';
import { treeToFlow } from '../utils';

function getDescendantIds(nodeId: string, nodes: Node[], edges: Edge[]): Set<string> {
  const descendants = new Set<string>();
  function dfs(id: string) {
    edges.forEach(edge => {
      if (edge.source === id) {
        descendants.add(edge.target);
        dfs(edge.target);
      }
    });
  }
  dfs(nodeId);
  return descendants;
}

export default function WorkflowDiagram({ isEditMode = false }: { isEditMode?: boolean }) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => treeToFlow(CUSTOMER_SUCCESS_WORKFLOW), []);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<{ id: string; label: string; type?: string } | null>(null);
  const [modalPos, setModalPos] = useState<{ x: number; y: number } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editNodeId, setEditNodeId] = useState<string | null>(null);
  const [collapsedNodeIds, setCollapsedNodeIds] = useState<Set<string>>(new Set());

  // Collapse/expand logic
  const toggleCollapse = (nodeId: string) => {
    setCollapsedNodeIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Compute visible nodes/edges based on collapsedNodeIds
  const visibleDescendants = useMemo(() => {
    const hidden = new Set<string>();
    collapsedNodeIds.forEach(id => {
      getDescendantIds(id, nodes, edges).forEach(did => hidden.add(did));
    });
    return hidden;
  }, [collapsedNodeIds, nodes, edges]);

  const visibleNodes = nodes.filter(n => !visibleDescendants.has(n.id));
  const visibleEdges = edges.filter(e => !visibleDescendants.has(e.source) && !visibleDescendants.has(e.target));

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode({ id: String(node.id), label: String(node.data.label as string), type: node.data.type as string });
    setModalPos({ x: event.clientX, y: event.clientY });
    setEditMode(false);
    setEditNodeId(null);
  }, []);

  const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  // Save node edits
  const handleSave = (updated: { id: string; label: string; type: string }) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === editNodeId
          ? {
              ...n,
              id: updated.id,
              data: { ...n.data, label: updated.label, type: updated.type },
            }
          : n
      )
    );
    setEdges((eds) =>
      eds.map((e) => {
        let changed = false;
        let newSource = e.source;
        let newTarget = e.target;
        if (e.source === editNodeId) {
          newSource = updated.id;
          changed = true;
        }
        if (e.target === editNodeId) {
          newTarget = updated.id;
          changed = true;
        }
        return changed ? { ...e, source: newSource, target: newTarget, id: `${newSource}-${newTarget}` } : e;
      })
    );
    setSelectedNode(null);
    setEditMode(false);
    setEditNodeId(null);
  };

  // Overlay settings button handler
  const handleSettingsClick = (node: Node, pos: { x: number; y: number }) => {
    setSelectedNode({ id: String(node.id), label: String(node.data.label as string), type: node.data.type as string });
    setEditMode(true);
    setEditNodeId(node.id);
    setModalPos(pos);
  };

  // Get node screen positions for overlay
  const [nodeScreenPositions, setNodeScreenPositions] = useState<{ [id: string]: { x: number; y: number } }>({});
  useEffect(() => {
    if (!reactFlowInstance) return;
    const viewport = reactFlowInstance.toObject().viewport;
    const positions: { [id: string]: { x: number; y: number } } = {};
    nodes.forEach((node) => {
      const x = node.position.x * viewport.zoom + viewport.x;
      const y = node.position.y * viewport.zoom + viewport.y;
      positions[node.id] = { x, y };
    });
    setNodeScreenPositions(positions);
  }, [nodes, reactFlowInstance]);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: 600, background: '#f5f8ff', borderRadius: 8, position: 'relative' }}>
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        fitView
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
        onInit={setReactFlowInstance}
      >
        <Background />
        <Controls />
      </ReactFlow>
      {reactFlowInstance && visibleNodes.map((node) => {
        const pos = nodeScreenPositions[node.id];
        if (!pos) return null;
        const isTerminal = String(node.data.label).includes('terminal');
        return (
          <React.Fragment key={node.id}>
            {isEditMode && (
              <button
                style={{
                  position: 'absolute',
                  left: pos.x + 100,
                  top: pos.y - 10,
                  zIndex: 10,
                  background: '#fff',
                  border: '1px solid #2c3e50',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                }}
                onClick={e => {
                  e.stopPropagation();
                  handleSettingsClick(node, { x: e.clientX, y: e.clientY });
                }}
                title="Edit Node"
              >
                <Settings2 color='#2c3e50' size={12} />
              </button>
            )}
            {!isTerminal && (
              <button
                style={{
                  position: 'absolute',
                  left: pos.x - 10,
                  top: pos.y - 10,
                  zIndex: 10,
                  background: '#fff',
                  border: '1px solid #2c3e50',
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                }}
                onClick={e => {
                  e.stopPropagation();
                  toggleCollapse(node.id);
                }}
                title={collapsedNodeIds.has(node.id) ? 'Expand Subtree' : 'Collapse Subtree'}
              >
                {collapsedNodeIds.has(node.id) ? <PlusSquare color='#2c3e50' size={12} /> : <MinusSquare color='#2c3e50' size={12} />}
              </button>
            )}
          </React.Fragment>
        );
      })}
      <NodeDetailsModal
        open={!!selectedNode}
        onClose={() => {
          setSelectedNode(null);
          setModalPos(null);
          setEditMode(false);
          setEditNodeId(null);
        }}
        nodeData={selectedNode || undefined}
        position={modalPos}
        isEdit={editMode}
        onSave={handleSave}
      />
    </div>
  );
} 