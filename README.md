# Running Project On Local Environment

## client

### Project setup

```
cd client
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

## server

### Project setup

```
cd server
npm install
```

### Compiles and hot-reloads for development

```
npm client
```

# Front-End Design Choices

- All designs and functionalities are made with custom css and javascript. Including edit, add, delete modals, inputs, tables. No npm packages is used since nothing related about the usage of libraries is stated in the document.

- Used components for repeated elements in order to avoid code repetition. (ex: EmailPasswordForm, GradientButton which are used many times.)

- Used 'scoped' for styling the components in order to achieve more modular and readable structure.

- Designed dynamic Modal component that emits confirm and deny function for sending configuration data related post,delete,patch requests to server.

- Firebase connection values come from .env file.

- Generic fetch function to send request data to server is designed for better readability.

- Very commonly used CSS classes are put in App.vue file.

# Back-End Design Choices

- Consists of controllers, middleware, routes, and config.

- In config folder, firebase-admin and firestore connections are made and exported. Firebase connection values come from .env file.

- Controllers interact with firebase collections and manipulates data.

- Endpoints and request types are determined in routes.

- All requests are firstly passing from verify-token middleware which checks if firebase id token is sent within the authorization header. If user is not authenticated, the api automatically returns 401(Forbidden).

- Used try catch statements while proceeding each request in order to catch the errors and return the response automatically.

- Configuration controller handles the main flow of app. Modification controller stands for the logging, to track user activities.

- For handling the update of parameters, the updated parameter compared with the original data and differences are retrieved. App sends PATCH requests accordingly with only changed parameters in order to avoid overwrites while updating data.

- In order to prevent conflicts while editing parameter, a middleware that process a lock mechanism is designed for the patch requests. User should firstly acquire the lock in order to edit the parameter. The lock is a controller object in order to manage the shared resource, that contains fieldsisLocked, lockedAt, and lockedBy. Lock is released on error and on successful edit operation. Concurrency issues are handled with the usage of lock mechanism and firestore transactions.

# Bonus & Extra Functionalities

- Audiences are created according to countries. While sending POST request, there is no country check, but while editing a parameter, app asks user to select country to apply changes or apply to default. By default, the form has value 'apply to all'. If user selects a country from dropdown, it only update the parameters for the spesific country, thus changes do not reflect to home page. The functionality is achieved with holding objects for each parameter that contain default value and object of country values in db.

- Country data can be read from url ('/country/{countryCode}'). If parameter has no custom value for the country, defaultValue of parameter is shown. There is no update, delete, or create operation in this page.

- Existing country codes in the app are ['tr','it','es','us','fr']

- Parameter view is designed, can be reached from the url ('/parameter/{id}'). It shows the default value for key,value, and description of the parameter. And the key,value, and description values for each country.

- Download json button is placed in dynamic /${countryCode} page. On click of the button the json file that contain key,value pairs of table is downloaded

- Register page, which is very similar to login page uses same form component with login page, but handles register functionality instead of login functionality.

- A popup is attached to the user icon on the header which redirects user to home page or modification page as well as logging out user using firebase/auth.

- Modification page that shows the activities of user is done. Backend of this page uses modification controller which interacts with a separate collection named 'modifications' in firestore. User email is get by with onAuthStateChange. Post requests are sent when user changed a data from parameters (edit, delete, or update).

# API Endpoints

- Get Configs ('/api/v1/configuration'): Get all parameters, values, descriptions with their default value.

- Get Configs By Country ('/api/v1/configuration/:id'): Returns 404 Not Found if country does not exist, If country exists and has a custom value for the spesific parameter it returns it. Otherwise, it returns the default value for the parameter. This check is done for each parameter in the table.

- Add Config ('/api/v1/configuration'): Creates a configuration that has key, value, description fields in the desired format facilitating the country audience control. Create_date is assigned to current date and id of the document is assigned with 'uuid' package of npm which is a very popular package to generate unique ids.

- UPDATE Config ('/api/v1/configuration/:id'): Updates the deviated fields from the original data for the record with Patch requests. If type is assigned to 'custom' in body, the operation is done for the values of given country code in body. Otherwise, operation is done for the default value of parameters.

- DELETE Config ('api/v1/configuration/:id'): Deletes the configuration document with the given id.

- ADD Modification ('/api/v1/modification'): Creates a modification with a given body. 'author' fields define the authenticated user who made the modification in data. The body of this request may be changed.

- GET Modifications ('/api/v1/modification'): List all modifications done by separate users to list them in modification page on front-end.

- Create Token ('api/v1/generateToken'): A generic route that returns a custom Firebase token (not id token!) based on a pre-defined string. It is not very much related to the flow of app, written for test purposes. Therefore there is no authentication check only for this route by verify-token middleware.

# Deployment

- Frontend is deployed on Vercel. Backend is deployed on Railway.app.

- Link that contains the website. https://setting-configurator.vercel.app/#/

# How to test app?

## 1 - By Website 'https://setting-configurator.vercel.app/#/'

- Register to app from register screen to see pages or
- Login with an existing user: {'email':'yunuskrt@gmail.com', password:'yunus123'}

## 2 - Both setting up client and server manually
Firstly, clone the project.

- Navigate to server with 'cd server'.
- Run 'npm install' and then 'npm start' to run server.
- Open new Terminal.
- Navigate to client with 'cd client'.
- Run 'npm install' and 'npm run serve'.
- Start testing on port 8080 for the client.

- Firebase credentials should be collected from firebase website. Since the credentials are fetched from .env file on both client and server

## 3 - Test Backend from Postman

- Copy the id token from authorization header in console under 'Network' section, which will be valid at most 1 hour by logging in with above user or registering with new user.
- Import the exported collection under root named 'Codeway.postman_collection.json' on Postman and test the app.
- Paste the copied token value as authorization header and test the backend.

- Also, the photos of the app can be found in snapshots folder under root directory.
