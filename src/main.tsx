import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Public Cloudflare builds serve verified public lessons only. The personal
// workspace requires a real authenticated private-data service and remains
// available for local development, never silently exposed in a public build.
const PublicLearningApp = lazy(() => import('./App'));
const PersonalWorkspace = lazy(() => import('./PersonalHub'));
const enablePersonal = import.meta.env.DEV || import.meta.env.VITE_APP_MODE === 'personal';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root mount element');
createRoot(root).render(
  <React.StrictMode>
    <Suspense fallback={<main aria-live="polite">正在加载学习系统…</main>}>
      {enablePersonal ? <PersonalWorkspace /> : <PublicLearningApp />}
    </Suspense>
  </React.StrictMode>
);
