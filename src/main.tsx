import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {GraphqlProvider, WorkflowRouteProvider, createWorkflowRouter} from "workflow-ui";
import {tokenAuthLink} from "auth/tokenAuthLink.ts";

const router = createWorkflowRouter(App, []);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GraphqlProvider authLink={tokenAuthLink}>
      <WorkflowRouteProvider router={router} />
    </GraphqlProvider>
  </React.StrictMode>,
)
