# reactjs-redux-commongateway-struct
React JS and Redux structure with commongateway(redux-promise-middleware) implemented.

NOTE : Routing is not introduced in that struct.

Commands to run in terminal :

* npm install
* npm start (It will start the development server)

If want to run the build, execute following command :

* npm run build


If it shows error like "Error: Actions must be plain objects. Use custom middleware for async actions" then follow below steps:

* Goto src/redux/store/store.js
* Comment line 10-17
* Run again
