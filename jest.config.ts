import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	testMatch: ['<rootDir>/src/**/*.spec.ts'],
};

export default config;
