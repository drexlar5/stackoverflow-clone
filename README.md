# stackoverflow-clone
This is a stack overflow clone of the backend

**Author:** Michael Agboola

**Environments**
Node version - v12.16.3 (LTS)

YARN version - v1.22.4

**This application uses the following technologies:**
* nodeJs
* expressJs
* socketIO
* mongoose
* sinon
* mocha
* chai
* JWT

**Install all dependencies**
```
yarn install
```
**Start the application**
```
yarn run start
```

**Run all tests**
```
yarn run test
```

## USER AUTHENTICATION -

**Endpoint** `http://localhost:8080/auth/signup` - method (POST)

- Creates a user profile

**Payload**

    {
      "username": "devguy",
      "firstname": "Michael",
      "lastname": "Agboola",
      "email": "test@test.com",
      "password": "12345"
    }


**Response format**

    {
      "message": "User created",
      "data": "5ee58b578f8b9f02a5a8604a"
    }

#### application/json

**Endpoint** `http://localhost:8080/auth/login` - method (POST)

- Authenticates a user

**Payload**

    {
        "email": "test@test.com",
        "password": "12345"
    }


**Response format**

    {
        "message": "User authenticated",
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwidXNlcklkIjoiNWVlMGNlYmU5MjI4ZDEwYTU1NDc4MGYzIiwiaWF0IjoxNTkyMTAxOTE0LCJleHAiOjE1OTIxMDU1MTR9.W5oEgLa5qLye5hS-QNQ1wwhzHBS6KXIb8VPOKyGqIa4",
            "userId": "5ee0cebe9228d10a554780f3"
        }
    }

#### application/json


## QUESTIONS -

**Endpoint** `http://localhost:8080/questions` - method (GET)

- Fetches all questions in database

**Response format**

    {
        "message": "Questions fetched successfully",
        "data": [
            {
                "vote": 0,
                "answersCount": 2,
                "answers": [
                    {
                        "_id": "5ee18daebbde45065cac7acc",
                        "user": {
                            "_id": "5ee0cebe9228d10a954780d5",
                            "firstname": "Mary",
                            "lastname": "Ogbonna",
                            "username": "Mary"
                        },
                        "comment": "A test answer"
                    },
                    {
                        "_id": "5ee18e60d872e10693480881",
                        "user": {
                            "_id": "5ee0cebe9228d10a554740k7",
                            "firstname": "Daniel",
                            "lastname": "Godstime",
                            "username": "Daniel"
                        },
                        "comment": "Alternative test answer"
                    }
                ],
                "isSubscribed": true,
                "_id": "5ee1366819866227a38faebc",
                "title": "a random question",
                "content": "a random test question",
                "creator": {
                    "_id": "5ee0cebe9228d10a554780f3",
                    "firstname": "Michael",
                    "lastname": "Agboola",
                    "username": "devguy"
                },
                "createdAt": "2020-06-10T19:37:12.076Z",
                "updatedAt": "2020-06-11T01:52:32.067Z",
                "__v": 2
            }
        ],
        "total": 1
    }

#### application/json

**Endpoint** `http://localhost:8080/question` - method (POST) **Authentication required**

- Creates a question

**Payload**

    {
        "title": "a random question",
        "content": "a random test question"
    }


**Response format**

    {
        "message": "Question created successfully",
        "data": {
            "question": {
                "vote": 0,
                "answersCount": 0,
                "answers": [],
                "isSubscribed": false,
                "_id": "5ee58edb8f8b9f02a5a8604b",
                "title": "a random question",
                "content": "a random test question",
                "creator": "5ee0cebe9228d10a554780f3",
                "createdAt": "2020-06-14T02:43:39.359Z",
                "updatedAt": "2020-06-14T02:43:39.359Z",
                "__v": 0
            },
            "creator": {
                "_id": "5ee0cebe9228d10a554780f3",
                "name": "Michael Agboola"
            }
        }
    }

#### application/json

**Endpoint** `http://localhost:8080/vote` - method (PATCH) **Authentication required**

- UP/DOWN votes a question

**Payload**

    {
        "vote": "up",
        "questionId": "5ee58edb8f8b9f02a5a8604b"
    }


**Response format**

    {
        "message": "Vote updated successfully",
        "data": 1
    }

#### application/json

**Endpoint** `http://localhost:8080/subscribe` - method (PATCH) **Authentication required**

- Updates question model isSubscribed field

**Payload**

    {
        "questionId": "5ee58edb8f8b9f02a5a8604b",
        "isSubscribed": true
    }


**Response format**

    {
        "message": "User subcribed to question successfully.",
        "data": {
            "vote": 1,
            "answersCount": 0,
            "answers": [],
            "isSubscribed": true,
            "_id": "5ee58edb8f8b9f02a5a8604b",
            "title": "a random question",
            "content": "a random test question",
            "creator": "5ee0cebe9228d10a554780f3",
            "createdAt": "2020-06-14T02:43:39.359Z",
            "updatedAt": "2020-06-14T02:46:28.943Z",
            "__v": 0
        }
    }
#### application/json


## ANSWERS -

**Endpoint** `http://localhost:8080/answers/answer` - method (POST) **Authentication required**

- Posts an answer to a question

**Payload**

    {
        "questionId": "5ee58edb8f8b9f02a5a8604b",
        "comment": "A test answer"
    }


**Response format**

    {
        "message": "Answer successfully created.",
        "data": {
            "_id": "5ee591a08f8b9f02a5a8604c",
            "question": "5ee1366819866227a38faebc",
            "user": "5ee0cebe9228d10a554780f3",
            "comment": "A test answer"
        }
    }

#### application/json

## SEARCH -

**Endpoint** `http://localhost:8080/search/question/:queryString` - method (GET)

- Runs a search on question model - `sample search query:` **random**

**Response format**

    {
      "message": "Question search successful",
      "data": [
                  {
                      "vote": 0,
                      "answersCount": 2,
                      "answers": [
                          {
                              "_id": "5ee18daebbde45065cac7acc",
                              "user": {
                                  "_id": "5ee0cebe9228d10a954780d5",
                                  "firstname": "Mary",
                                  "lastname": "Ogbonna",
                                  "username": "Mary"
                              },
                              "comment": "A test answer"
                          },
                          {
                              "_id": "5ee18e60d872e10693480881",
                              "user": {
                                  "_id": "5ee0cebe9228d10a554740k7",
                                  "firstname": "Daniel",
                                  "lastname": "Godstime",
                                  "username": "Daniel"
                              },
                              "comment": "Alternative test answer"
                          }
                      ],
                      "isSubscribed": true,
                      "_id": "5ee1366819866227a38faebc",
                      "title": "a random question",
                      "content": "a random test question",
                      "creator": {
                          "_id": "5ee0cebe9228d10a554780f3",
                          "firstname": "Michael",
                          "lastname": "Agboola",
                          "username": "devguy"
                      },
                      "createdAt": "2020-06-10T19:37:12.076Z",
                      "updatedAt": "2020-06-11T01:52:32.067Z",
                      "__v": 2
                  }
              ],
    }

#### application/json

**Endpoint** `http://localhost:8080/search/answer/:queryString` - method (GET)

- Runs a search on answer model -  `sample search query:` **test**

**Response format**

    {
        "message": "Answer search successful",
        "data": [
            {
                "_id": "5ee0cef29228d10a554780f4",
                "question": "5ee0c78f18e043035ae9cb69",
                "user": "5ee0cebe9228d10a554780f3",
                "comment": "A random test answer",
                "__v": 0
            },
            {
                "_id": "5ee591a08f8b9f02a5a8604c",
                "question": "5ee1366819866227a38faebc",
                "user": "5ee0cebe9228d10a554780f3",
                "comment": "A test answer",
                "__v": 0
            }
        ]
    }

#### application/json

**Endpoint** `http://localhost:8080/search/user/:queryString` - method (GET)

- Runs a search on user profile - `sample search query:` **Michael**

**Response format**

    {
        "message": "User search successful",
        "data": [
            {
                "_id": "5ee0cebe9228d10a554780f3",
                "email": "test1@test.com",
                "firstname": "Michael",
                "lastname": "Agboola",
                "username": "devguy"
            },
            {
                "_id": "5ee58b578f8b9f02a5a8604a",
                "email": "test2@test.com",
                "firstname": "Bidemi",
                "lastname": "Michael",
                "username": "pedro"
            }
        ]
    }

#### application/json




### -------------------------------Side note--------------------------------------------------

- Only a user that asked a question can subscribe to be notified when the question is answered.
- When a question is answered the question model is checked to see if the **isSubscribed** field is true.
- If the subscribed field is true, The messaged is emitted using the questionId as its channel.
- Only users listening on that channel will receive the notification that the question has been answered.
