<h1>AWS Todo List API</h1>
<h3>This repository contains an API for managing a todo list using AWS services as the backend infrastructure.</h3>


<h2>Deployment</h2>

1. Setting up AWS Services
* AWS Lambda:
Create a Lambda function using the provided code. Make sure to grant appropriate IAM permissions to the Lambda function to interact with DynamoDB.
* AWS DynamoDB:
Create a DynamoDB table named todo-list with a primary key id of type Number.
* AWS API Gateway:
Set up API Gateway to trigger the Lambda function.
Configure API Gateway to integrate with the Lambda function for each route as described in the code.

2. IAM Permissions
* Lambda IAM Permissions:
Assign the necessary IAM permissions to the Lambda function to access DynamoDB. 

3. JWT Authorization with Cognito
* Amazon Cognito:
- Set up an Amazon Cognito user pool to manage user authentication.
- Configure Cognito to issue JWT tokens upon successful authentication.
- Enable Cognito User Pool authorizer in API Gateway to authenticate and authorize requests using JWT tokens.
- Secure the API endpoints by configuring Cognito User Pool authorizer in API Gateway.

4. Environment Variables
* Lambda Environment Variables:
Set environment variables for AWS region and any other configurations required by the Lambda function.

<h2>Testing</h2>

1. User Registration:
* Register a user using the Amazon Cognito User Pool.
* Provide necessary user information such as email, password, etc.
* Verify the registration by confirming the email.

2. User Authentication:
* Log in to the application using the registered credentials.
* Obtain the access token after successful login.

3. Access Token Retrieval:
* Extract the access token from the response after successful authentication.
* The access token will be used to authorize requests to the API endpoints.

4. API Endpoint Testing:
* Use an HTTP client or tools like Postman to test the API endpoints exposed by the Lambda function through API Gateway.
* Include the obtained access token in the Authorization header of the requests.
* Utilize the provided endpoints:
GET /todos: Retrieve all todo items.
GET /todos/{id}: Retrieve a specific todo item by ID.
POST /todos: Create a new todo item.
PUT /todos/{id}: Update an existing todo item by ID.
DELETE /todos/{id}: Delete a todo item by ID.

5. Sample Requests:

Retrieve all todos:
GET https://eidw2eyoqc.execute-api.eu-north-1.amazonaws.com/api/todos

Retrieve a specific todo by ID:
GET https://eidw2eyoqc.execute-api.eu-north-1.amazonaws.com/api/todos/{id}

Create a new todo:
POST https://eidw2eyoqc.execute-api.eu-north-1.amazonaws.com/api/todos
Body:
{
  "title": "Sample Todo",
  "description": "Sample description",
  "status": "pending"
}

Update an existing todo by ID:
PUT https://eidw2eyoqc.execute-api.eu-north-1.amazonaws.com/api/todos/{id}
Body:
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "completed"
}

Delete a todo by ID:
DELETE https://eidw2eyoqc.execute-api.eu-north-1.amazonaws.com/api/todos/{id}

6. Inspect Responses: 
* Verify that the API responses match the expected behavior for each endpoint. 
* Ensure that todos are created, updated, and deleted correctly in the DynamoDB table.

7. Error Handling: 
* Test error cases by sending invalid requests or causing exceptions in the Lambda function code. 
* Verify that error responses are returned with appropriate status codes and error messages.

<h4>By following these deployment and testing instructions, you can set up and validate the functionality of the AWS Lambda Todo API, including integration with API Gateway, DynamoDB, user authentication, and authorization using Amazon Cognito</h4>



