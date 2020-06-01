# CVme

## What is it?
A **Fast**, **Simple** and **Free** app that will build you a good styled CV that will help you get your dream job.

**You can try the app :point_right: [here](http://cvmee.herokuapp.com/)** :point_left:

**Disclaimer**: this is still a work in progress. Expect some buggy behaviour while I build things up.

## What can it do?

It's plain simple! 

* **Signup**: You should create an account to store your CVs!
* **Login**: Login to your account to browse/create/delete and manage your CVs.
* **Logout**: Come back whenever you want and pick it up right where you left it.
* **Create CV**: Create as many CVs as you want.
* **Delete CV**: Delete them if you don't like them.
* **Modify CV**: There's no need to be so dramatic: you can always change them instead of deleting them!
* **Share CV**: Share them via link. Forget format incompatibilities: the web is open to anyone and any device!
* **Download CV**: Looking for a more formal way of presenting yourself? Download the classic PDF format!
* **Autosave**: This app was thought as a costumer-centric UX, so there are no "save" buttons in any form: the data just gets autosaved when the user types any changes, coping server-performance and UX.

## Client Side

### React Router Routes

| Path | Component | Access | Description |
| ---| -------| -----| ------------|
| / | Home    | /    | All agents |  Landing Page 
| /singup | Signup    | Non-users only    | Signup form. Once singed up, automatically logs the user in | 
| /login |  Login   | All agents    | Login form, link to signup, navigate to dashboard after login if user is logged in. | 
| /profile | Profile   | Logged in users only   | Shows all CVs created by the user and a buttons to update profile info and create new CVs. | 
| /cv/:id/edit | CV    | Logged in users only   | Shows an specific CV based on :id URL param and displays a CV editor | 
| /cv/:id/templates | Templates    | Logged in users only    | Shows an specific CV based on :id URL param and displays all the available templates to choose from | 
| /cv/:id |  OnlineCV   | All agents | Shows an specific CV based on :id URL and displays it in the browser| 


## Server Side

### Models

#### User
```javascript
{
    firstName: String,
    lastName: String,
    title: String,
    email: String,
    password: String,
    phone: String,
    profilePicture: String,
    profileDescription: [{}],
}, {
    timestamps: true
}
```

#### CV
```javascript
{
    name: String,
    color: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userInfo: {
        firstName: String,
        lastName: String,
        title: String,
        email: String,
        password: String,
        phone: String,
        profilePicture: String,
        profileDescription: [{}],
    },
    employment: [{
        title: String,
        employer: String,
        start: String,
        end: String,
        city: String,
        description: [{}],
    }],
    education: [{
        degree: String,
        school: String,
        start: String,
        end: String,
        city: String,
        description: [{}],
    }],
    skills: [{
        skill: String,
        level: Number,
    }],
    links: [{
        label: String,
        link: String,
    }],
}, {
    timestamps: true,
}
```

### API Endpoints

#### Auth

Method | Path | Description |
-------| -----| ------------|
post    | /api/signup    | Sends sign up info to the server and creates user in the DB. |
post    | /api/login  | Sends login form data to the server. | 
post    | /api/logout    | Sends user intent to logout request to the server. | 
get   | /api/loggedin   | Aks the server is the user is logged in to allow them access to certain areas of the app. | 


#### User

Method | Path | Description |
-------| -----| ------------|
post    | /api/user/updateInfo/:id    | Edit specific user profile info based on :id URL param. |
post    | /api/user/uploadProfilePic/:id  | Uploads a User's Profile Picture based on :id URL param. | 


#### CV General 

Method | Path | Description |
-------| -----| ------------|
get    | /api/cvs/templates    | Asks the server to retrieve all available templates. |
get    | /api/cvs/user/:id  | Asks the server to retrieve all CVs and their info belonging to an specific user based on :id URL param. | 
get    | /api/cvs/info/:id    | Asks the server to retrieve an specific CV info based on :id URL param. | 
post   | /api/cvs/newcv   | Commands the server to create a new CV belonging to the specific connected user. | 
post    | /api/cvs/update/:id    | Sends new CV info to the server based on :id URL param and updates said CV. |
post    | /api/cvs/uploadProfilePic/:id  | Sends new Profile Picture of an specific CV based on :id URL param. | 

#### CV Items 

Method | Path | Description |
-------| -----| ------------|
post    | /api/cvs/createEducation/:id    | Commands the server to create a new Education Item related to an specific CV based on :id URL param. |
post    | /api/cvs/createEmployment/:id  | Commands the server to create a new Employment Item related to an specific CV based on :id URL param. | 
post    | /api/cvs/createSkill/:id    | Commands the server to create a new Skill Item related to an specific CV based on :id URL param. | 
post   | /api/cvs/createLink/:id   | Commands the server to create a new Link Item related to an specific CV based on :id URL param. | 
post    | /api/cvs/deleteEducation/:id    | Commands the server to delete a new Education Item related to an specific CV based on :id URL param. |
post    | /api/cvs/deleteEmployment/:id  | Commands the server to delete a new Employment Item related to an specific CV based on :id URL param. | 
post    | /api/cvs/deleteSkill/:id    | Commands the server to delete a new Skill Item related to an specific CV based on :id URL param. | 
post   | /api/cvs/deleteLink/:id   | Commands the server to delete a new Link Item related to an specific CV based on :id URL param. | 
post   | /api/cvs/changeTemplate/:id   | Commands the server to change an specific CV's template based on :id URL param. | 


## Built with :heart: and

* React
* MongoDB
* Mongoose
* Express

## Created By
**[Gerardo Toledo](https://www.linkedin.com/in/gerardo-toledo/)**
