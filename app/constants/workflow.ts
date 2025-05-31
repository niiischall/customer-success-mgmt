export type WorkflowNodeType = 'start' | 'action' | 'decision' | 'terminal';

export interface WorkflowNode {
  id: string;
  label: string;
  type: WorkflowNodeType;
  children?: WorkflowNode[];
}

export const CUSTOMER_SUCCESS_WORKFLOW: WorkflowNode = {
  id: 'start',
  label: 'Webhook / New Ticket',
  type: 'start',
  children: [
    {
      id: 'auto_ack_email',
      label: 'Auto Acknowledge Email',
      type: 'action',
      children: [
        {
          id: 'categorize_issue',
          label: 'Categorize Issue',
          type: 'action',
          children: [
            {
              id: 'assign_team',
              label: 'Assign to Team',
              type: 'decision',
              children: [
                {
                  id: 'billing_team',
                  label: 'Billing Team',
                  type: 'action',
                  children: [
                    {
                      id: 'billing_terminal',
                      label: 'Close Ticket',
                      type: 'terminal',
                    },
                  ],
                },
                {
                  id: 'technical_team',
                  label: 'Technical Team',
                  type: 'action',
                  children: [
                    {
                      id: 'sla_timer',
                      label: 'SLA Timer',
                      type: 'action',
                      children: [
                        {
                          id: 'follow_up_email',
                          label: 'Follow-Up Email',
                          type: 'action',
                          children: [
                            {
                              id: 'tech_terminal',
                              label: 'Close Ticket',
                              type: 'terminal',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'customer_experience_team',
                  label: 'Customer Experience Team',
                  type: 'action',
                  children: [
                    {
                      id: 'cx_terminal',
                      label: 'Close Ticket',
                      type: 'terminal',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}; 