# Video Portal
This is just a demo that I had to do to apply for a job.
*(If you wanna know the story... I didn't get the job XD, because I hadn't idea how to make a test of the UI using karma. Well, we are all learning)*
The idea is that, if you are a beginner, you could take this example and do it by your own or just putting your hand onto the code. Also, I'd like to get somes `request` about using `karma` or how I could improve everything using `webpack`.

The app make use of `NodeJS`, `ExpressJS` and `MongoDB`. So you need to have installed MongoDB.

I also included webpack. I did a simple configuration that works well for this small app, but for complex larges apps, you have to find out the way to make you app faster and better :).

##What is it about?
It's a simple video portal where you first have to log in and then you have some list of videos. You can watch them and also rate the video.

Because it's a simple app, I don't make use of `Redux` (I did but it had no sense for an small app).
The code is splited following the next pattern:

> In the folder `component` I made `jsx` files based on the route or the page that I wanted to show.

> Within each file I had small pieces of components which create the whole needed page.

* components/
    * **app.jsx**: It contains the routers and also imports the other files components.
    * **header.jsx**: The name says it. It's a basic header piece of html.
    * **loginForm** *(based on a page)*: This is the first component loaded. It's a simple form to get inside the app.
    * **messages**: An stand alone component which only display basic messages such as: `Error`, `Warning` and `Success`. You can use it whenever you want.
    * **videos** *(based on page)*: It contains two big components and small ones that make the other two work. the big ones are based on two pages: `List of videos` and `Single video`.