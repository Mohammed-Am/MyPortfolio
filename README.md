To run the application:

1.  **Start the backend server:**
    Open a new terminal, navigate to the `event-reminder-backend` directory, and run:
    ```bash
    node server.js
    ```
    You should see `Server running on port 5000`.

2.  **Start the frontend application:**
    Open another new terminal, navigate to the `event-reminder-frontend` directory, and run:
    ```bash
    npm start
    ```
    This will open the application in your browser (usually at `http://localhost:3000`).

**Functionality:**

*   You can view a list of dummy events on the homepage.
*   Click "Add New Event" to create a new event. You can add multiple guests with their names and WhatsApp numbers.
*   When you create an event, a mock WhatsApp message will be logged in the backend terminal for each guest.
*   You can edit existing events by clicking the edit icon.
*   You can delete events by clicking the delete icon.

This setup demonstrates the core functionality and API integration. The WhatsApp messaging is currently mocked, but the structure is in place for integration with the real 1CONFIRMED API.
