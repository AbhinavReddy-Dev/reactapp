**This is yet another todo app that can perform all CRUD actions. JWT tokens are used to make the authentication possible, one for remembering and generating new tokens and one for authheader to verify the user.**

All the components are styled in conventional way, css file is imported when required.

React Redux is also implemented.

GraphQL and Apollo client are used instead of REST API.

I tried to impelment my own authentication system using JWT and it is not a perfect implementation though, I tried my best not to use localStorage but for a token that's going to expire in a very short time is okay in this case.
One improvement I will make is to blacklist the tokens once they're revoked.

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

4. Run command below to make build

`npm run build`
