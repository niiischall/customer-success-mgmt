This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

Here, we are using [react-flow](https://github.com/xyflow/xyflow) framework for workflow diagrams.


1. The UI render existing workflow definition with all the nodes.
2. The workflow supports the following nodes:
   - Start node, which represent input data or real-time flow like webhook.
   - Action nodes, where user gives some input configuration.
   - Decision nodes, which represent if else case.
   - Terminal nodes, which represent end of a sub tree.
3. The UI has details view for each node, where config of a given node van be seen.
4. In edit mode, each node has config screen, which can open as popover / drawer to provide config of that node.
5. Also, for cases of very complex workflows, we have the capability to collapse a given sub tree (or branch) will give lot of flexibility to user to     understand workflow and thereby make edits to sub sections.

You can check out the production app [here](https://customer-success-mgmt.vercel.app/).
