// Import required modules from Playwright Test and MQTT
const { expect } = require('@playwright/test');
const mqtt = require('mqtt');

// Define an asynchronous function to validate MQTT topics
export async function validateMQTTtopic(topic, deviceId, expectedData, maxAttempts = 10) {
    return new Promise((resolve, reject) => {
        // Connect to the MQTT broker with specified credentials
        const client = mqtt.connect('mqtt://******:1883', {
            username: '****',
            password: '****',
        });

        // Event handler for successful connection
        client.on('connect', () => {
            console.log('Connected to MQTT broker');
            client.subscribe(topic); // Subscribe to the specified MQTT topic
        });

        // Event handler for receiving MQTT messages
        client.on('message', async (receivedTopic, message) => {
            const receivedDataString = message.toString();
            const receivedData = JSON.parse(receivedDataString);

            // Check if the received message is for the specified device ID
            if (receivedData.deviceinfo.device_id === deviceId) {
                // Remove currenttime field, log received data, and compare with expected data
                delete receivedData.deviceinfo?.currenttime;
                console.log(receivedData);
                try {
                    expect(JSON.stringify(receivedData)).toEqual(JSON.stringify(expectedData));
                    resolve(); // Resolve the promise if data matches the expectation
                } catch (error) {
                    console.warn(`Received data does not match expected data: ${error.message}`);
                } finally {
                    client.end(); // Always close the MQTT connection
                }
            } else {
                console.warn(`Received heartbeat for a different deviceid ${receivedData.deviceinfo.device_id}`);
            }
        });

        // Reject the promise if maximum attempts are reached without receiving the correct message
        setTimeout(() => {
            reject(new Error(`Maximum attempts reached. Stopping.`));
            client.end(); // Close the MQTT connection after the specified time
        }, maxAttempts * 5000);
    });
}