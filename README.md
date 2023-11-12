# Fitnomenal Workouts

## Description

This web app provides users with randomly generated workouts to avoid repetitiveness and offers a way to track their progress against user-set goals. 
The project was developed as part of General Assembly’s Software Immersive Bootcamp and was the third project in the course, created by a group of three individuals.

The app consumes a third-party API - ExerciseDB ([ExerciseDB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)) to provide workout exercises.

## Deployment Link

https://fitnomenal-workouts.vercel.app/

## Timeframe

This was a group project with a timeframe of 1 week for deployment and presentation.

## Technologies Used

### MERN environment:

- Node.js
- Express.js
- React (Next.js as the React framework for this project)
- MongoDB (and Mongoose)

### Additional technologies:

- Tailwind CSS
- Flowbite (component library)
- Git and GitHub
- Consuming a third-party API from Rapidapi.com
- Trello board, Slack, Zoom, and LucidChart

## Getting Started / Code Installation

This project is separated into two repositories - a frontend and backend one, for ease of deployment. If you’d like to install this project on your local machine, this is the link for the companion backend repository:

[Backend repo link](https://github.com/SofiaTruta/Fitnomenal-Backend)

Feel free to fork these projects and clone them into your local environment. All dependencies needed are listed in both `package.json` files. You’ll need to set up a `.env` file as per the `.env.example` file.

## MVP Requirements

We were asked for an MVP that includes:

- A working full-stack, single-page application
- Technologies of the MERN-stack (MongoDB/Mongoose, Express.js, React, Node.js)
- Well-styled interactive front-end.
- Communication with the Express backend via AJAX.
- Implementation of authentication, including the ability of a user to sign-up, log in & log out.
- Authorization by restricting CUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.
- A well-scoped feature-set. Full-CRUD data operations are not required if other features are included, for example: consume data from a third-party API, implement additional functionality if the user is an admin, Implementation of a highly dynamic UI or data visualization.

## Planning

As a group, we had two afternoons to plan for the project, from deciding the project theme to sharing initial wireframes, ERD, and presenting these to the instructional team.

We set up a Trello board to share information and planning between group members.

The very first idea was around a workout and calorie tracker, but quickly it evolved into the idea of generating random workouts based on a third-party API and tracking the completion of these workouts. The calorie tracker idea was moved to a stretch goal after planning for the implementation of the project, and towards the delivery date, this idea was dropped in favor of styling and improving existing functionality.

These are some of the initial wireframes:

![wireframe](https://i.imgur.com/d67Loxrs.png)
![wireframe](https://i.imgur.com/fJ5XjgGm.png)
![wireframe](https://i.imgur.com/6UnG6fRm.png)

Our initial ERD (proposed by myself, it did have some changes throughout the project development):

![ERD](https://i.imgur.com/GsC8FOfl.png)

## Build Process

As this was a group project, I will discuss my main responsibilities in this project:

### Backend:

- Set up of Trello board
- Set up of initial ERD and database Models relationship
- Third party API research
- Initial set up of Express backend
- User Model related routes and controllers (backend)
- `randomiserFunction.js`
- Contributions to `dailyWorkouts` Controller and `workoutHistory` controller - for the functionality of changing status from ‘in progress’ to ‘complete’ as well as saving workout to `workoutHistory`.

### Frontend:

- Authentication and Login/Logout functionality (using NextAuth and Google OAuth2)
- Setup of a Provider for session monitoring
- Setup and initial implementation of a Context for sharing state between components
- Styling and functionality of the landing page and homepage, including fetch requests
- Altering `workout-details` page to fetch workout data from backend rather than context (for the workout data to be more permanent and less affected by page refreshes etc)
- Navbar functionality and styling
- Complimentary styling contributions to `workout-details` page and `goals` page

Deployment of the project - this was a solo responsibility, and was done with help and sharing ideas with both colleagues from class and the instructional team.

## Challenges

- The biggest challenge was working as a team chosen by the instructional team and learning how to communicate and work as a group in such a small amount of time.
- Using Git and GitHub as a group was also difficult and led to many obstacles, one of the biggest challenges of this project too.

## Wins

- Being able to turn a shared vision from a group into a real project that feels unique.

## Key Learnings

- Understanding dynamics of working as a group and being able to divide the project appropriately so all members have a balanced contribution.
- A better understanding of Git and GitHub flow and actively using it
- Learning how to use Next.js without direct examples or lessons from the instructional team (it made me feel proficient being able to navigate documentation and using the latest version of a technology, and understanding it enough to feel confident explaining certain functionalities to colleagues and instructional team if needed).

## Known Bugs

- Edit functionality requires the user to complete all fields rather than just 1 - we tried to target each value independently but on deployment day this functionality had a bug. We were unable to fix this on time for deployment, so making the submit button disabled was the way to fix this.

## Future Improvements

- Improve edit functionality in the Goals section so the user is able to edit one field at a time rather than having to complete every input.
- Small styling improvements
