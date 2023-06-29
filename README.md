# Trustblock Assignement

<br />
<br />

## Overview

This project uses **NextJs**, **NextAuth**, **NestJs**, and **Prisma** technologies.
There are two databases. On the front side, the database handles the user connection and session. On the backend, the database is for event creation and modification. I chose to create two **Sqlite** databases to avoid that you make DB configurations. Both of them are with the code. The only action needed is to install dependencies and run the project. <br/><br />
For CSS, I chose to work with **TailwindCss** rather than SCSS.
The reason is that I had many new technologies to work on. I decided to use what I know about CSS to allocate more time to the unknown (Prisma / NextAuth / File Upload on Nest / SMTP Server).

In this app, you can log on with NextAuth _EmailProvider_. You can log off.
Create, update and delete an event if you are the owner.
Consult other people's events.
Creation-wise, file upload is developed on the server side. So you can choose and update a picture for an event.

<br />
<br />
## Installation

To run this project, you will need to have the following requirements:

1. Node >= **18.16.0**
2. NestJs
3. Yarn package manager

You will find a .env file in both front end and back end repositories.
I had trouble with NextAuth on Windows but not on OSX. Some of those variables solve the issue on Windows. I suggest you keep them there, just in case.

### Backend

```
	DATABASE_URL="file:./dev.db"
	SERVER_URL=http://localhost:4000
```

### Frontend

```
	DATABASE_URL="file:./dev.db"
	NEXTAUTH_URL=http://localhost:3000
	NEXTAUTH_FROM=hassan.dev.smtp@gmail.com
	EMAIL_SERVER=smtp://hassan.dev.smtp@gmail.com:zwpcenusxbkvpzuv@smtp.gmail.com:587
	NEXTAUTH_EMAIL_SERVER=smtp://hassan.dev.smtp@gmail.com:zwpcenusxbkvpzuv@smtp.gmail.com:587`
```

**_Note:_**
Those variables are also in the file: _next.config.js_ as NextJs has trouble fetching them from the _.env_ file

<br />

The following commands are needed to run the project localy. Make sure you are in the <span style="color: red;">**dev**</span> branch, main is used with deployement configuration.

```bash
	// In the back folder
	yarn install
	...
	yarn start:dev
```

```bash
	// In the client folder
	yarn install
	...
	yarn dev
```

The client runs on [http://localhost:3000](http://localhost:3000)<br />
The server runs on [http://localhost:4000](http://localhost:4000)

<br />
<br />

# Tests

I did not have much time for testing. I did few tests on the back end to show that I know how to use Jest. I tested my helpers. But when it comes to controller and services, I couldn't work on them.

<br />
<br />

# What has been done

1. Log on and Lof off with NextAuth

-   > I started with EmailProvider for authentication. I thought that I would be able to add the password from there. EmailProvider sends a magic link for authentication. After that, I read about CredentialsProvider. I tried to combine them, but I don't think it's possible. It is only a supposition, maybe I should have used GoogleProvider for this, but It took me quite some time, so I decided to move on to the following assignments.

-   > I set up an SMTP server via one of my Gmail addresses. The credentials are in the .env file. It should be good to go on launch.

-   > If you are logged in, you cannot sign in.

<br />

2. All pages are there.

-   > It is not perfect, but they are all responsive.

-   > Display and interactions changes depending on your authentication status.

-   > The pagination is done via the GET route. By default each time **See more** button is clicked, 10 additional events are fetched. If there no other event to retreive, the button disappears.

<br />

3. CRUD is done for the Event module

-   > Creation-wise, the image is saved in the back end as a png file. It is not perfect yet, because when I delete an event, I do not remove the image. So this needs to be handled in the delete route. I also thought about a cron job for cleaning the server. It is nice to have that for this kind of situation. I kept it simple they are in one folder, but each user should have a corresponding folder in a regular project.

-   > Locations are filtered. An event creation blocked if the location is invalid.

<br />

4. Deployement

-   > The deployed server is accessible [here](https://super-gray-dove.cyclic.app/)
-   > Front end is not deployed. I used vercel for that, but I had troubles with Prisma and NextAuth. Unfotunatly I did not have enough time to solve it.

<br />

5. Form

-   > Form control is done on both back end and front end. I use react-hook-form for the client. I had some issues with the display, so It is not exaclty as requested. I decided to not spent much time on debugging that part, so I can work on other subjects. I displayed messages to show that it is working.

<br />

6. Bonuses

-   > NestJs
-   > Category
-   > Magic link via Email

<br />

7. Additional Features

-   > Search bar is implemented
-   > Error and confirmation notifications on CREATE / UPDATE / DELETE

<br />
<br />

# What is missing

-   > Front end deployement
-   > Wallet authentication
-   > End to end testing with Cypress
-   > Password for user authentication (only an email is needed)

I also thought of other additions that were not on the list but would significantly improve the app.
I wanted to work on them if I had the time to do it.

-   > Loaders
-   > An actual date picker.
-   > Smooth transitions between pages
-   > A fallback page if the server is down

<br />
<br />

# Security

When it come to security, the front end should be safe.
The only danger can come from the upload. I checked the file type on the server side. It is unlikely that malicious code or reverse shells will pass through. It might be breakable, but not in the obvious ways.

<br/>
Tools like Prisma are supposed to protect platforms from SQL injection.
That aside, Prisma is supposedly vulnerable to JSON injection.

<br/>
The biggest flaw in this project is the back end. Routes are not safe with tokens. Tools like GoBuster could easaly exposes ***/events*** routes. I did not have enough time to implement JWT.
Anyone that accesses the URL can mess with the DB and retrieve the user's emails. I use them to know who is the author of one event.
