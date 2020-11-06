# inVision

Everyone has a dream they know they should spend more time pursuing but the infectious call of YouTube’s algorithm is often too strong to ignore. Or they’ve only got 15 free minutes and you have to spend 10 of those figuring out what you could do with such a short period of time. 

inVision is a mobile app where users can create “Dreams” that have associated “Why”s and “How”s. The “Why”s to remind them why they wanted to pursue the dream in the first place and the “How”s to remind them how to do it. Using a "Tell Me What To Do" button, users can cut out the frontal lobe part of the decision making process and get to work after being given a random task based on their available time.

[Link to app demo](https://youtu.be/rO6GHFzMdQY)

## Installation

clone this repo ```git@github.com:BeatleyTQD/inVision.git```

[Create a new SQL Database](https://github.com/BeatleyTQD/inVision/blob/main/SQL/01_Db_Create.sql)

[Add in User Seed Data](https://github.com/BeatleyTQD/inVision/blob/main/SQL/02_Seed_Data.sql)

Note you'll need to update the firebase user ids if you want to use the provided dummy data.

## Using inVision
Designed to be viewed with the iPhone 6/7/8 Plus view mode, but will work with a regular browser (though a bit small).
Register a new account to log in.

Once logged in select "New Dream" and follow the prompts add Whys and Hows.

Once the dream is completed you'll be automatically directed to the main pillar of the app. 

At the top of the page is a "Tell Me What To Do" button. Clicking this will prompt you for your available time and upon input will query your list of active tasks based on that timeframe and return to you a random taks so you can get to work.

From here you can perform see, edit, or delete your active Hows as well as add more as they arise. You are also able to "Complete" a task and generate a record of it in your "completed" log. 

Beneath the Hows section is a randomly generated Why as a friendly reminder and a link to view, edit, and delete your complete list of Whys and add more as you see fit.

From the main home page, navigating to an in progress dream will take you to a soft landing page with a randomly generated Why to remind you of why you set out on this journey in the first place.


## Technologies Used
Visual Studio and Visual Studio Code

C# and ASP.NET

React.js

SQL Express

Reactstrap

CSS3

HTML5
