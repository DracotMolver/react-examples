## Building images

You need to create images for development and production. These images are going to be build with the content of the `Dockerfile` on the `client` and `server` folder. Each one of theses Docker files has a `base` image from where we have 2 stages `dev` (development) and `prod` (production). 

Copy and paste the next command line on your terminal to build the images:
```terminal
docker build ./client -t client-dev --target=dev
docker build ./server -t server-dev --target=dev
docker build ./client -t client-prod --target=prod
docker build ./server -t server-prod --target=prod
````

## Running the containers

* **develompent**
  To run as a development mode, you must check the `docker-compose.yml` file and see that each service, `server` and `client` are pointing to the development stage.**server-dev** and **client-dev**

after checking you can type in your terminal:
```terminal
docker-compose up
```

* **production**
 Same as development but the images labels are: **reign-server-prod** and *client-prod**

## Testing
To run the test you have to inter to the `server` container. To do this, copy and pase the next command. Make sure docker is running already, otherwise type: `docker-compose up`.

```terminal
docker-compose run server bash
npm run test
```
