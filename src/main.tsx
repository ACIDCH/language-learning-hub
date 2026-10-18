import './styles.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import AppShell from './AppShell';
import {AISettingsProvider} from './AISettings';
const root=document.getElementById('root');
if(!root)throw new Error('Missing #root mount element');
createRoot(root).render(<React.StrictMode><AISettingsProvider><AppShell/></AISettingsProvider></React.StrictMode>);
