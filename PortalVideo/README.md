# Video Portal
This is just a demo that I had to do to apply for a job.
*(If you wanna know the story... I didn't get the job because I had no idea how to make a test using Karma. Well, we are all learning)*.

The app use `NodeJS`, `ExpressJS` and `MongoDB`. It was made using NodeJS `8.10.0` and MongoDB `3.6.2`

I also included webpack. I did a simple configuration that works well for this small app. But for complex larges apps, you have to find out the way to make you app faster and better :).

## What is the app about?
It's a simple video portal where you first have to log in and you can check a list of videos. You can watch them and also rate them.

Here I do a nice folder structor for the components. I try to follow a good and nice pattern to make components clean and reusables.

Because it is a simple app, I don't make use of `Redux` (I did but it had no sense for an small app).

## How to run the app?
* Start your mongoDB
* Run `npm run start`
* Then run `npm run build`

The application is in `developement` mode. You may be askin, why I'm not using `webpack-dev-server`. Simple, this was my first app made with React and also using seriously webpack. For the moment just do the steps below and you can test the app. I will make a proper setting up for the next time :bowtie:

## User and Password
The password is the same for all the users: *react123*
<br>
* Users:
    * ali
    * harry
    * tom