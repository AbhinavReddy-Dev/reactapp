**This is yet another todo app that can perform all CRUD actions. JWT tokens are used to make the authentication possible, one for remembering and generating new tokens and one for authheader to verify the user.**

#### Steps to run this locally

1. Install node on your device

2. Run commands

```
git clone git@github.com:singularityDev/reactapp.git
cd reactapp
npm install
cd client && npm install
cd ..
```

3. Run command to start the application

`npm run dev`

All the components are styled in conventional way, css file is imported when required.

React Redux is also implemented.

GraphQL and Apollo client are used instead of REST API.

/middleware folder has the code that verifies the user request and sets isAuth true if the user sends a verified token through authheader.
