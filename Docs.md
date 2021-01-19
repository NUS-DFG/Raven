# API Docs

All requests and responses concerning the API are made using JSON. 


## User

### Add a new user
To add a new user to the database and authenticate the user, issue a POST request to the following endpoint:

```
POST /api/users/signup HTTP/1.1
Host: www.ravenapp-api.herokuapp.com
Content-Type: application/json; charset=utf-8
```

#### Parameters
| Parameter | Description | Required |
| ------------- |:-------------|:-----:|
| username | The username of the new user. It must not be longer that 15 characters long. | yes |
| password | The password of the new user. It must must be at least 8 characters long and contain at least one uppercase letter, one lower case letter, one number and one special character. | yes |
| email | The email of the new user. It must be in a valid email format. | yes |

Following a **successful** POST request, the authorization token will be placed inside the browser's cookie. A JSON object will also be returned:

```
{
    "verified": false,
    "projects": [],
    "_id": "60066fe93484941a41bab0ed",
    "username": "Raven",
    "email": "ravenapp.dfg@gmail.com",
    "__v": 0
}
```

Following an **unsuccessful** POST request, a JSON object with the appropriate attributes describing the error encountered will be returned:

**Note**: All the attributes are part of separate error responses.

```
{
    "username": "That username already exists, please try another."
    "password": "Your password must be at least 8 characters long and contain at least one uppercase letter, one lower case letter, one number and one special character. Please try another."
    "email": "That email already exists, please try another."
}
```

### Authenticate an existing user
To authenticate an existing user, issue a POST request to the following endpoint:

```
POST /api/users/signin HTTP/1.1
Host: www.ravenapp-api.herokuapp.com
Content-Type: application/json; charset=utf-8
```

#### Parameters
| Parameter | Description | Required |
| ------------- |:-------------|:-----:|
| uid | The unique identifier of the existing user. It can either be the username or the email. | yes |
| password | The password of the existing user.| yes |

Following a **successful** POST request, the authorization token will be placed inside the browser's cookie. A JSON object will also be returned:

```
{
    "verified": false,
    "projects": [],
    "_id": "5fef0d3ad5278d323f81642a",
    "username": "Raven",
    "email": "ravenapp.dfg@gmail.com",
    "__v": 0
}
```

Following an **unsuccessful** POST request, a JSON object with the appropriate attributes describing the error encountered will be returned:

**Note**: All the attributes are part of separate error responses.

```
{
    "uid": "The email address or username that you've entered doesn't match any account."
    "password": "The password that you've entered is incorrect."
}
```

### Sign out a user
To sign out a signed in user, issue a POST request to the following endpoint:

```
POST /api/users/signout HTTP/1.1
Host: www.ravenapp-api.herokuapp.com
Content-Type: application/json; charset=utf-8
```

Following a **successful** POST request, the authorization token in the browser's cookie will be removed. A JSON object will also be returned:

```
{
    status: "Log Out Successful",
}
```

### Get user data
To get an existing user data based on the browser's cookie, issue a GET request to the following endpoint:

**Note:** you have to be signed in to access this API endpoint
```
GET /api/users/data
Host: www.ravenapp-api.herokuapp.com
```

Following a **successful** GET request, the data of the user associated with authorization token in the browser's cookie will be returned as a JSON object:

```
{
    "verified": false,
    "projects": [],
    "_id": "5fef0d3ad5278d323f81642a",
    "username": "Raven",
    "email": "ravenapp.dfg@gmail.com",
    "__v": 0
}
```

Following an **unsuccessful** POST request, a JSON object with the appropriate attributes describing the error encountered will be returned:

```
{
    "msg": "No token, access denied",
    "isExpired": false
}
```

### Get any user data
To get an existing user data, issue a GET request to the following endpoint:
#### Request:

```
GET /api/users/:username
Host: www.ravenapp-api.herokuapp.com
```

#### Response:
```
{
    "viewedUser": {
    "verified": false,
    "projects": [
    {
    "collaborators": [],
    "_id": "600...,
    "name": "Pro...",
    "description": "Test...",
    "author": "600...",
    "date": "2021...",
    "__v": 0
    }
    ],
    "_id": "600...",
    "username": "test...",
    "email": "test...",
    "__v": 1
    }
}
```

## Project
### View all projects
Get the list of all projects.
#### Request:
```
GET /api/projects
Host: www.ravenapp-api.herokuapp.com
```
#### Response:
```
[
    {
        "img": {
            "data": {
                "type": "Buffer",
                "data": [**image buffer**]
            },
            contentType: "image/jpg",
        },
        "collaborators": []
        "_id": "6000..."
        "name": "Goog...",
        "description": "A duplic...",
        "author": "600...",
        "date": "2021...",
        "__v": 0
    },
    {
        "img": {
            "data": {
                "type": "Buffer",
                "data": [**image buffer**]
            },
            contentType: "image/jpg",
        },
        "collaborators": [],
        "_id": "600...",
        "name": "Ravena...",
        "description": "A webs...",
        "author": "600...",
        "date": "202...",
        "__v": 0
    }
    
]
```

### View a project
View a project's detail. 

To access this API, you need to be signed in. Refer to the Users API.

#### Request:
```
GET /api/projects/:id
Host: www.ravenapp-api.herokuapp.com
```

#### Response:
```
{
    "img": {
        "data": {
            "type": "Buffer",
            "data": [**image buffer**]
        },
        contentType: "image/jpg",
    },
    "collaborators": []
    "_id": "6000..."
    "name": "Goog...",
    "description": "A duplic...",
    "author": "600...",
    "date": "2021...",
    "__v": 0
}
```

### Create a project
Create a new project.

To access this API, you need to be signed in. Refer to the Users API.

#### Request:
```
POST /api/projects/
Host: www.ravenapp-api.herokuapp.com
Content-Type: application/json; charset=utf-8
```

##### Parameters as JSON in request body
| Parameter | Description | Required |
| ------------- |:-------------|:-----:|
| name | Name of the project | yes |
| description | The description of the project| yes |


#### Response:
```
{
    "collaborators": [],
    "_id": "6006...",
    "name": "A new ...",
    "description": "A new ...",
    "author": "60045...",
    "date": "2021-01-...,
    "__v": 0
}
```

### Delete a project
Delete a project that you created.

To access this API, you need to be signed in as the author of the project. Refer to the Users API.
#### Request:
```
DELETE /api/projects/:id
Host: www.ravenapp-api.herokuapp.com
```
#### Response:
```
{
    "msg": true
}
```

### Update a project
Edit a project that you created.

To access this API, you need to be signed in as the author of the project. Refer to the Users API.
#### Request:
```
PUT /api/projects/:id
Host: www.ravenapp-api.herokuapp.com
Content-Type: application/json; charset=utf-8
```

##### Parameters as JSON in request body
| Parameter | Description | Required |
| ------------- |:-------------|:-----:|
| name | Updated name of the project | yes |
| description | Updated description of the project| yes |

#### Response:
```
{
    "collaborators": [],
    "_id":"60066...",
    "name":"Anoth...",
    "description":"new...",
    "author":
        {
            "verified":false,
            "projects": ["60066723567c5600178d3e3d","600668af567c5600178d3e3e"],
            "_id":"60045e91e51dae0017771e4a",
            "username":"dhafin",
            "email":"dhafin@email.com","__v":2},
            "date":"2021-01-19T05:05:51.378Z",
            "__v":0
        }
}
```

### Update a project image
Edit the image of a project that you created.

To access this API, you need to be signed in as the author of the project. Refer to the Users API.
#### Request:
```
POST /api/projects/:id
Host: www.ravenapp-api.herokuapp.com
Content-Type: multipart/form-data; 
```

#### Parameters
The request contains form-data which consists of `file` and the project `id`.

#### Response:
```
{
    img: {
        data: [**image buffer**],
        contentType: "image/jpg",
    },
}
```

### Search projects based on query
Get the list of projects based on a keyword query.

#### Request:
```
GET /api/search/:query
Host: www.ravenapp-api.herokuapp.com
```
#### Response:
```
[
    {
        "img": {
            "data": {
                "type": "Buffer",
                "data": [**image buffer**]
            },
            contentType: "image/jpg",
        },
        "collaborators": []
        "_id": "6000..."
        "name": "Goog...",
        "description": "A duplic...",
        "author": "600...",
        "date": "2021...",
        "__v": 0
    }
]
```
