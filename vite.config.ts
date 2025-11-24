/// <reference types="node" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // We use process.cwd() to get the root directory.
  const env = loadEnv(mode, process.cwd(), '');

  // Prioritize the environment variable from the system (CI/CD) over the .env file
  // GitHub Actions sets secrets as environment variables (process.env)
  const apiKey = process.env.API_KEY || env.API_KEY;

  return {
    plugins: [react()],
    // Use relative base path to ensure assets load correctly on GitHub Pages subdirectories
    base: './', 
    define: {
      // This specifically replaces `process.env.API_KEY` in the client code with the string literal
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false
    }
  };
});
