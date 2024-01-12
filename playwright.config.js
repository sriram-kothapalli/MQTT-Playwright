// Import the 'defineConfig' function from the '@playwright/test' library
import { defineConfig } from '@playwright/test';


// Define and export the configuration for the Playwright test framework
export default defineConfig({
  // Specify the directory where test files are located
  testDir: './tests',
  // Set the default timeout for test operations to 5000 milliseconds
  timeout: 5000,
  // Set the maximum number of test retries to 1
  retries: 1,
  // Specify the reporter to be used for test result output (HTML format in this case)
  reporter: 'html',
  // Define projects for different test environments
  projects: [
    {
      // Configuration for the test project
      use: {
        // Specify the base URL for the test project
        baseURL: '****URL****',
        // Set context options with the option to ignore HTTPS errors
        contextOptions: { ignoreHTTPSErrors: true },
        // Set viewport dimensions for the browser
        viewport: { width: 1366, height: 768 },
        // Specify the browser to be used (Chromium in this case)
        browserName: 'chromium',
        // Set launch options, such as headless mode (false in this case)
        launchOptions: { headless: false },
        // Enable browser tracing
        trace: 'on',
      },
    },
  ],
  // Set additional context options for all projects with the option to ignore HTTPS errors
  contextOptions: { ignoreHTTPSErrors: true },
  });
