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
> **Make sure backend is running.**

> The body options should be `x-www-form-urlencoded` and should contain a key `repoURL` and value of any repo. (i.e. `github.com/algolia.places`)
> Image should look like: 
> ![image](https://lh3.googleusercontent.com/nMfj9BUbes7T5DOXwhXAAdbinrUoIUckE1aErHF0IaguquET8sNm7hZLmSm_VJMV39aGjUD8xOoueGIHNhAWF9vlliZLLUeFXUgPvXif3amr2D3lgDApV_kGGkOGTN_IL9YjGSRveW1hhF7hxDsGnGplJfJWeryx_WIkcRSMIZ57bIeP83s6DPywazvOGvoRqryLUV26TYXxOsiG9lQORrVAlU5hnQtN2ux-08MQV3qYNodFyA29_fMsOCj9sCKjQdw-3nZN-I7idaGeS5cvy8Gvi1jjFrkd1R79QziP-n8eMa-7Y-gMKNmJ8UeA5HQtC_Nt1lhHbX6GZZP6GOqshjkTtzJOcWreNXARbniLoALlzEh5O2uK7uT9iq4eTjGhRDHV3Xal5OzUe0xOytCR7IWWC83WGUYNFxxodcIvkDFTuYNAr3SZgGDAmxNPIABmNLKzQxsao3CQyl8EHIIFDwbwsOmJAKe-mYw7vg7H8c78Hj-qhEcuWZDwJXJzOiyz1iX0McX4mjY5YVtPpgPodasVLOXCP7H5nqUtsV5Rc0yH9nxiqmiVbk3NlaDk6Jz-D6wIS2BYv-sNA1Up4k3OdCdbceKxz1xMlROK1l5bcL0gQnZ259d9z7MJ7CZO1NYvrjFn_mb-Qfpqg7ndlASSTtQ6N0uGSmA2H-XaeiI0J3xWqmEGclVFGE8=w1984-h1246-no)
3. Click `SEND` to see you request. (Check console)

### Testing with other tools
- Requests in terminal using `curl`.
- Manually through the frontend.
