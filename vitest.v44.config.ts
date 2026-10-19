import {defineConfig} from 'vitest/config';
export default defineConfig({test:{environment:'jsdom',include:['tests/v44.test.tsx','tests/v44-cloud.test.tsx'],restoreMocks:true,testTimeout:15000}});
