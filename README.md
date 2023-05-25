To set up the development environment and run the API, follow these instructions:

1. Install Node.js if not already installed

2. Clone the project repository to the directory you want to

3. Install dependencies in your project directory

Run the following command to install the project dependencies:

npm install axios cors dotenv express mongoose node-cron nodemon

4. Configure the environment variable

Create a .env file in the project directory.
Open the .env file and type:

MONGODB_URI = 'YOUR_MONGODB_URI'

Replace YOUR_MONGODB_URI with the mongodb cluster url you want to use for this project

5. Start the API server:

In the terminal or command prompt, run the following command to start the server:

npm start

The API server should start running, and you should see a message indicating the server is listening on a specific port (Server started on port 5000).

6. Test the API endpoints:

Use an API testing tool like Postman or cURL to send requests to the API endpoints.
The API endpoints and their documentation are available below
Send requests to the appropriate URLs, using the correct HTTP methods and parameters as specified in the documentation.

That's it! You should now have the development environment set up and the API running.

------------**\***------------

API Documentation:

note: if you use this code exactly like it is then base url will be http://localhost:5000

// API 1- Generate Random Gold Price

URL: /gold/mock-price
Method: GET
Description: Generates a random gold price within the range of 5500 to 6500.
Response: JSON object with the generated gold price.
Example Response:

{
"price": 6203
}

------------**\***------------

// API 2- Update Gold Item Price

URL: /gold/update-item-price/:itemId
Method: PUT
Description: Updates the price of a specific gold item based on its ID (example ID- necklace01).

Parameters:
:itemId (path parameter) - The unique ID of the gold item to update.

Response: JSON object indicating the success or failure of the operation.
Example Response (Success):
{
"success": true,
"message": "Gold item price updated successfully."
}

Example Response (Failure - Item not found):
{
"success": false,
"message": "Item not found."
}

Example Response (Failure - Update error):
{
"success": false,
"message": "Failed to update gold item price."
}

------------**\***------------

// API 3- Get Gold Item Prices

URL: /gold/item-prices
Method: GET
Description: Retrieves the current prices and best prices of gold items.

Parameters:
itemId (query parameter, optional) - The custom ID of a specific gold item to filter the results.
timeRange (query parameter, optional) - The time range in days to consider when calculating the best price. Defaults to 30 days if not provided.

Response: JSON object containing the current prices and best prices of gold items.

Example Response (no query parameter):
{
"currentPrices": [
{
"itemId": "ring01",
"price": 55860
},
{
"itemId": "necklace01",
"price": 126730
}
],
"bestPrices": [
{
"itemId": "ring01",
"bestPrice": 55860
},
{
"itemId": "necklace01",
"bestPrice": 126730
}
]
}

Example Response (query parameter given as itemId=necklace01)
{
"currentPrices": [
{
"itemId": "necklace01",
"price": 126730
}
],
"bestPrices": [
{
"itemId": "necklace01",
"bestPrice": 126730
}
]
}

Example Response (invalid itemId)
{
"success": false,
"message": "No gold items found."
}

Note: The currentPrices field provides the current prices of gold items, while the bestPrices field provides the best prices within the specified time range.

Please note that the actual URLs may vary depending on your server configuration. Ensure that you replace http://localhost:5000 with the appropriate base URL for your API.
