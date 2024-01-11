import { expectedData1 } from "../fixture/mqtt";
import { validateMQTTtopic } from "../pom/mqtt";
const { test, expect } = require('@playwright/test');
// Define a Playwright test for Test Case 1
test('Test Case', async () => {
  const deviceId = 5; // Specify the desired device ID
  await validateMQTTtopic(`merck/pharma/particlecounter/heartbeat`, deviceId, expectedData1);
  //create multiple topics like this 
  // await validateMQTTtopic(`****/*****/****/sample`, deviceId, expectedData2);
  // await validateMQTTtopic(`****/*****/****/data`, deviceId, expectedData3);
});