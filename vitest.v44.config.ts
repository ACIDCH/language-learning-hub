import {defineConfig} from 'vitest/config';
export default defineConfig({test:{environment:'jsdom',include:['tests/v44.test.tsx','tests/v44-cloud.test.tsx','tests/v44-drive.test.ts','tests/v44-auth.test.tsx','tests/browserAudioAnalysis.test.tsx','tests/phonemeEvidence.test.ts','tests/v44-speaking-ui.test.tsx'],restoreMocks:true,testTimeout:15000}});
