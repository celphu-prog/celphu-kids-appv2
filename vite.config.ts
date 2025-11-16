import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // This 'define' block is the key to fixing the blank screen issue.
    // It tells Vite to replace any occurrence of 'process.env.API_KEY'
    // in the code with the actual value of the API_KEY environment variable
    // at build time. Netlify provides this environment variable during the build.
    define: {
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    }
  }
});
