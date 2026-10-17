import {defineConfig} from 'vitest/config';
export default defineConfig({test:{environment:'jsdom',include:['tests/speechV3.test.tsx'],restoreMocks:true}});
