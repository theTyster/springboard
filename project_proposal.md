# Project Proposal

Use this template to help get you started right away! Once the proposal is complete, please let your mentor know that this is ready to be reviewed.

## Get Started

|            | Description                                                                                                                                                                                                                                                                                                                                              | Fill in |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Tech Stack | What tech stack will you use for your final project? It is recommended to use the following technologies in this project: Python/Flask, PostgreSQL, SQLAlchemy, Heroku, Jinja, RESTful APIs, JavaScript, HTML, CSS. Depending on your idea, you might end up using WTForms and other technologies discussed in the course.                               |   Python/Flask, PostgreSQL, SQLAlchemy, Yunohost (I would like to host this project on my own hardware), Jinja, RESTful APIs, JavaScript, HTML, CSS      |
| Type       | Will this be a website? A mobile app? Something else?                                                                                                                                                                                                                                                                                                    |   This will be a website. Optimized for mobile usage.      |
| Goal       | What goal will your project be designed to achieve?                                                                                                                                                                                                                                                                                                      |   This project will allow people with accounts on Mastodon, Pleroma, Akkoma, Firefish, and Friendica ([67% of the network](https://fediverse.observer)) to schedule posts using the native API on their instance.      |
| Users      | What kind of users will visit your app? In other words, what is the demographic of your users?                                                                                                                                                                                                                                                           |   The target audience for this App is Fediverse users who value Free and Open Source Software. This is a large group of users on the network.      |
| Data       | What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack, you are required to create your own API. |   The only data I will be collecting will be user login data. This will need to be stored in a postgresql database. Other data that I will use will be consumed through the [Mastodon API](https://docs.joinmastodon.org/entities/ScheduledStatus/)      |

# Breaking down your project

When planning your project, break down your project into smaller tasks, knowing that you may not know everything in advance and that these details might change later. Some common tasks might include:

- Determining the database schema
- Sourcing your data
- Determining user flow(s)
- Setting up the backend and database
- Setting up the frontend
- What functionality will your app include?
  - User login and sign up
  - Uploading a user profile picture

Here are a few examples to get you started with. During the proposal stage, you just need to create the tasks. Description and details can be edited at a later time. In addition, more tasks can be added in at a later time.

| Task Name                   | Description                                                                                                   | Link to Task                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Design Database schema      | Determine the models and database schema required for this project.                                           | [Link]() |
| Source Your Data            | Determine where the data will come from. You may choose to use an existing API or create your own.            | [Link](https://docs.joinmastodon.org/entities/ScheduledStatus/) |
| User Flows                  | Determine user flow(s)                                                                                        | [Link]() |
| Set up backend and database | Configure the environmental variables on your framework of choice for development and set up database.        | [Link]() |
| Set up frontend             | Set up frontend framework of choice and link it to the backend with a simple API call for example.            | [Link]() |
| User Authentication         | Fullstack feature - ability to authenticate (login and sign up) as a user                                     | [Link]() |

## Labeling

| Label Type    | Description                                                                                                                                                                                                                                                                                                                     | Example                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------                         |
| Difficulty    | Estimating the difficulty level will be helpful to determine if the project is unique and ready to be showcased as part of your portfolio - having a mix of task difficultlies will be essential.                                                                                                                               | Easy, Medium, Hard                                   |
| Type          | If a frontend/backend task is large at scale (for example: more than 100 additional lines or changes), it might be a good idea to separate these tasks out into their own individual task. If a feature is smaller at scale (not more than 10 files changed), labeling it as fullstack would be suitable to review all at once. | Frontend, Backend, Fullstack, API, Framework/Library |
| Stretch Goals | You can also label certain tasks as stretch goals - as a nice to have, but not mandatory for completing this project.                                                                                                                                                                                                           | Must Have, Stretch Goal                              |
| Goals For Capstone 2 | This Label will include features and goals that would be implemented for the next capstone project.                                                                                                                                                                                                                             | Must Have, Stretch Goal                              |
