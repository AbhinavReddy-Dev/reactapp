**This is yet another todo app that can perform all CRUD actions. JWT tokens are used to make the authentication possible, one for remembering and generating new tokens and one for authheader to verify the user.**

#### Steps to run this locally

1. Install node on your device

2. Run command
   `git clone git@github.com:singularityDev/reactapp.git`
3. Go into the folder and run commmand
   `npm install`
4. Now, go into the client folder then run the command
   `npm install`
5. Now go to the main folder and then run the command
   `npm run dev`

All the components are styled in conventional way, css file is imported when required.

GraphQL and Apollocient are used instead of REST API.

/middleware folder has the code that verifies the user request and sets isAuth true if the user sends a verified token through authheader.
