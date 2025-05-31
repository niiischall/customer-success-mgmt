export interface WorkflowNode {
  id: string;
  label: string;
  children?: WorkflowNode[];
}

export const CUSTOMER_SUCCESS_WORKFLOW: WorkflowNode = {
  id: 'new_ticket',
  label: 'New Ticket',
  children: [
    {
      id: 'auto_ack_email',
      label: 'Auto Acknowledge Email',
      children: [
        {
          id: 'categorize_issue',
          label: 'Categorize Issue',
          children: [
            {
              id: 'assign_team',
              label: 'Assign to Team',
              children: [
                {
                  id: 'billing_team',
                  label: 'Billing Team',
                  children: [
                    {
                      id: 'sla_timer',
                      label: 'SLA Timer',
                      children: [
                        {
                          id: 'follow_up_email',
                          label: 'Follow-Up Email',
                          children: [
                            {
                              id: 'close_ticket',
                              label: 'Close Ticket',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'technical_team',
                  label: 'Technical Team',
                  children: [
                    {
                      id: 'sla_timer',
                      label: 'SLA Timer',
                      children: [
                        {
                          id: 'follow_up_email',
                          label: 'Follow-Up Email',
                          children: [
                            {
                              id: 'close_ticket',
                              label: 'Close Ticket',
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
                  children: [
                    {
                      id: 'sla_timer',
                      label: 'SLA Timer',
                      children: [
                        {
                          id: 'follow_up_email',
                          label: 'Follow-Up Email',
                          children: [
                            {
                              id: 'close_ticket',
                              label: 'Close Ticket',
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
        },
      ],
    },
  ],
}; 