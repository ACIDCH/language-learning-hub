import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Public Cloudflare builds serve verified public lessons only. The personal
// workspace requires a real authenticated private-data service and remains
// available for local development, never silently exposed in a public build.
const SpeechLab = lazy(() => import('./SpeechLab'));
const PublicLearningApp = lazy(() => import('./App'));
const PersonalWorkspace = lazy(() => import('./PersonalHub'));
const CloudWorkspace = lazy(() => import('./CloudWorkspace'));
const enablePersonal = import.meta.env.DEV || import.meta.env.VITE_APP_MODE === 'personal';
const cloudRoute = location.pathname === '/cloud' || location.pathname.startsWith('/cloud/');

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root mount element');
createRoot(root).render(
  <React.StrictMode>
    <Suspense fallback={<main aria-live="polite">正在加载学习系统…</main>}>
      {location.pathname === '/speech-lab' ? <SpeechLab /> : cloudRoute ? <CloudWorkspace /> : enablePersonal ? <PersonalWorkspace /> : <PublicLearningApp />}
    </Suspense>
  </React.StrictMode>
);
