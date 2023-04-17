# Documentaiton

The fitness application is created for a Fitness Studio. The customers of the fitness can register and logged in to the app, see information about the trainers and the company, they can also share experience in form of sharing their fitness training plans. 
The users of the app can:
-	Register
-	Log in
-	Log out
-	See information about the fitness studio
-	See training plans of other customers

-	Logged in users can share/post their own training plan. They can edit and delete only their own plans. But they can comment the plans of the others.
-	Guest users can only see the plans of the other users as well details for each plan. But they can NOT edit, delete or comment any plan.
-	Any user can send a message using the form in the contact link. After sending the message - the owner of the fitness will automatically receive an email from the sender including his data and his message. 
-   If user is not logged in, and try to go to page like /myPlans, /createPlan, /logout, he will be redericted to the login page.

# Technologies used in the project:
-	React 18.2.0
-	React-router-dom 6.9.0
-	Bootstrap
-	Font Awesome
-	Emailjs-com 3.2.0

# Used server for the project is:
**SoftUni practice server** ( https://github.com/softuni-practice-server/softuni-practice-server#collections ) 
-	**NOTE:** CRUD operations for the collections use other links than those described in the server documentation:
    -	http://localhost:3030/data/plans
    -   http://localhost:3030/data/comments

# How to start it?
-	Start terminal from the client folder do ***npm start***
-	Start terminal from the server folder do ***node server.js***


# Deployment
You can try out the app on https://project-gym-24441.firebaseapp.com/
