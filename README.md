# Fitnomenal App - description

This web app provides the users with randomly generated workouts in order to avoid repetitiveness, as well as a means to track their progress against goals set by the user!

This project was developed as part of General Assembly’s Software Immersive Bootcamp. It was the third project of this course and it was a group project (three members). 

It consumes a third party API - [ExerciseDB](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) to provide the workout exercises. 

*this is the frontend repo only - please find the backend repo [here](https://github.com/SofiaTruta/Fitnomenal-Backend)*

![screenshot](https://i.imgur.com/OKcNpS5b.png)
![screenshot](https://i.imgur.com/nuhK2stb.png)
![screenshot](https://i.imgur.com/5naaHw1b.png)



## Deployment Link

https://fitnomenal-workouts.vercel.app/

## Timeframe 

This group project was developed and presented within a week. 

## Technologies Used

### MERN Stack
- Node.js
- Express.js
- React with Next.js
- MongoDB with Mongoose

Additional technologies:
- Tailwind CSS
- Flowbite (component library)
- Git and GitHub for version control
- Integration of RapidAPI’s ExerciseDB
- Collaborative tools: Trello, Slack, Zoom, LucidChart

## Getting Started / Code installation

Clone both the frontend and backend repositories to your local environment. Ensure to install dependencies as specified in the respective package.json files. Additionally, set up a .env file as per the provided .env.example file.

Create a MongoDB database, preferably the free version suitable for this project.

Obtain an API key and host from RapidAPI. We used [ExerciseDB from Rapid API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) from Rapid API for workout data.


## MVP requirements
- A working full-stack, single-page application
- Incorporate the technologies of the MERN-stack (MongoDB/Mongoose, Express.js, React, Node.js)
- Have a well-styled interactive front-end.
- Communicates with the Express backend via AJAX.
- Implement authentication, including the ability of a user to sign-up, log in & log out.
- Implement authorization by restricting CUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.
- Have a well-scoped feature-set. Full-CRUD data operations are not required if one or more other features are included, for example: consume data from a third-party API, implement additional functionality if the user is an admin, Implementation of a highly dynamic UI or data visualisation.


## Planning

As a group we had two afternoons to plan for the project, from deciding the project theme to sharing initial wireframes, ERD and presenting these to the instructional team. 

We set up a Trello board to share information and planning between group members. 

The very first idea was around a workout and calorie tracker, but quickly it evolved into the idea of generating random workouts based on a third party API and tracking completion of these workouts. 
The calorie tracker idea was moved to a stretch goal after planning for implementation of the project - and towards the delivery date this idea was dropped in favour of styling and improving existing functionality. 


![ERD for project](https://i.imgur.com/kSZ1XGjm.png)

![wireframe](https://i.imgur.com/d67Loxr.png)

![wireframe](https://i.imgur.com/6UnG6fRm.png)


When dividing responsibilities, we aimed for balanced contributions in both frontend and backend tasks. Division was based on frontend page functionalities, each correlating with a particular database Model.

## Build Process

As this was a group project, I will outline my main responsibilities in this project.

### Backend:
- Setting up the initial ERD and database Model relationships.
- Researching third-party APIs.
- Establishing the Express backend.
- Creating routes and controllers for the User Model.
- Contributions to dailyWorkouts Controller and workoutHistory Controller, facilitating the transition of workout status from 'in progress' to 'complete' and saving workout history.

### Frontend:
- Implementing authentication, login/logout functionality using NextAuth and Google OAuth2.
- Setting up of a Provider for session monitoring.
- Implementing a Context for state sharing between components.
- Designing and integrating landing page and homepage functionalities, including fetch requests.
- Adjusting workout-details page to fetch data from the backend rather than relying solely on context.
- Crafting and styling the navbar, contributing to the styling of workout-details page and goals page.

I managed the solo deployment of the project, seeking guidance and exchanging ideas with classmates and the instructional team.

Here are some snippets of code that I created:
```
async function newUser(req, res) {
    try {
        const now = new Date();

        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            user = await User.findOneAndUpdate({
                email: req.body.email
            }, {
                lastLoggedIn: now,
            });

            res.status(200).json(user)
        }

        if (!user) {
            try {
                user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    lastLoggedIn: now,
                    height: 0,
                    weight: 0,
                    goalWeight: 0,
                    workoutGoal: 0,
                    firstLoggin: "true" // added so we can redirect if first loggin
                });

                await user.save();
                res.status(200).json({ user });
            } catch (error) {
                console.log('problems in the BE creating a new user', error);
                res.status(500).json({ error });
            }
        }
    } catch (error) {
        console.log('Error in newUser function:', error);
        res.status(500).json({ error });
    }
}

```
and if you visit the NewWorkoutModal component - that is one of the pages written solely by myself. 

## Challenges

- Navigating group dynamics and establishing effective communication within a short time frame was our primary challenge. 
- Learning how to use Git and GitHub as a group was also quite a learning curve.

## Wins

- Being able to turn a shared vision from a group into a real project which feels unique.
- Being able to prioritise and understand what is achievable or not in a specific timeframe. 
- Incorporating an API which felt perfect for the functionality of our app. 


## Key Learnings

- Understanding and navigating group dynamics, ensuring balanced contributions among team members
- Gaining proficiency in Git and GitHub flow through active collaboration. 
- Learning how to use Next.js without direct instructional support (it made me feel proficient being able to navigate documentation and using the latest version of a technology, and understanding it enough to feel confident explaining certain functionalities to colleagues and instructional team if needed)


## Known Bugs

The edit functionality in the Goals section demands completion of all fields rather than allowing single-field editing - on deployment day this functionality had a bug. Our temporary resolution was to disable the submit button.

## Future Improvements

- Improving the edit functionality in the Goals section, allowing users to edit individual fields independently.
- Implement minor styling improvements.


