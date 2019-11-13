# mario-level-language
Language for making Mario levels.

## Running the project
### Required Tools
1. [Docker](https://www.docker.com/products/docker-desktop)
2. Node(v10) and NPM(Node Package Manager)

### First Method
1. Initiate Docker.
2. On the root directory run `npm run restart-docker`.

### Second Method(Easier for testing specific Front-End or Back-End implementations)
1. On the root direcotry run `sh install-dependencies.sh`. (Once every time new dependencies are added)
2. To run the front-end.
>1. Go to the frontend directory `cd frontend`
>2. `npm run start`
>3. frontend is hosted on [http://localhost:3000](http://localhost:3000)
3. To run the back-end.
>1. Go to the backend directory `cd backend`
>2. `npm run build && npm run start`
>3. backend is hosted on [http://localhost:8080](http://localhost:8080)

## Testing the project

### Required Tools
1. [Postman](https://www.getpostman.com/downloads/)

### Testing Visualization With Postman (For Backend Only)
1. Run Postman
2. Enter a `POST` Request to the url `http://localhost:8080/makeWorld`
> The body options should be `x-www-form-urlencoded` and should contain a key `repoURL` and value of any repo. (i.e. `github.com/algolia.places`)
> Image should look like: 
> ![image](https://i.ibb.co/JCV8dg6/Screen-Shot-2019-11-12-at-4-24-38-PM.png)
3. Click `SEND` to see you request. (Check console)

### Testing with other tools
- Requests in terminal using `curl`.
- Manually through the frontend.
