# Documentaiton

The fitness application is created for a Fitness Studio. The customers of the fitness can register and logged in to the app, see information about the trainers and the company, they can also share experience in form of sharing their fitness training plans. 
The users of the app can:
-	Register
-	Log in
-	Log out
-	Show profile details
-	Edit profile 
-	Delete profile 
-	View information about the fitness studio
-	View training plans of other customers
-	Create / Edit / Delete training plans
-	Create comments

-	Logged in users can share/post their own training plan. They can edit and delete only their own plans. But they can comment the plans of the others.
-	Guest users can only view the plans of the other users as well details for each plan. But they can NOT edit, delete or comment any plan.
-	Any user can send a message using the form in the contact link. After sending the message - the owner of the fitness will automatically receive an email from the sender including his data and his message. 
-   If user is not logged in, and try to go to page like /myPlans, /createPlan, /logout, he will be redericted to the login page.
-   (Users and plans/comments will be automatically deleted after 2 days to avoid spamming).

# Technologies used in the project:
-	React 18.2.0
-	React-router-dom 6.9.0
-	Bootstrap
-	Font Awesome
-	Emailjs-com 3.2.0
-	Firebase / Firestore



# Used server for the project is:
**Firebase Firestore** 

# How to start it?
-	Start terminal and install ***react*** (if not installed) from the app folder do ***npm install react***
-	Start terminal and install ***react-router-dom*** (if not installed) from the app folder do ***npm install react-router-dom***
-	Start terminal and install ***emailjs-com*** (if not installed) from the app folder do ***npm install emailjs-com***
-	Start terminal from the app folder do ***npm install -g firebase-tools***
-	Start terminal from the root folder do ***firebase init***
-	Start terminal from the root folder do ***firebase init***
-	Start terminal from the client folder do ***npm start***


# Deployment
You can try out the app on https://project-gym-dobrin-dobrev.web.app/
