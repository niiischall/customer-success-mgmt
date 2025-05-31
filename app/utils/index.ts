import { WorkflowNode } from '../constants/workflow';
import { Node, Edge } from '@xyflow/react';

export function treeToFlow(
  node: WorkflowNode,
  parentId: string | null = null,
  nodes: Node[] = [],
  edges: Edge[] = [],
  level: number = 0,
  posX: number = 0
): { nodes: Node[]; edges: Edge[] } {
  const nodeId = node.id;
  const labelWithType = `${node.label} (${node.type})`;
  nodes.push({
    id: nodeId,
    data: { label: labelWithType },
    position: { x: posX * 250, y: level * 100 },
    style: { color: '#2c3e50', fontWeight: 600 },
    type: 'default',
    draggable: true,
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
      treeToFlow(
        child,
        nodeId,
        nodes,
        edges,
        level + 1,
        posX + idx - (node.children!.length - 1) / 2
      );
    });
  }
  return { nodes, edges };
}
