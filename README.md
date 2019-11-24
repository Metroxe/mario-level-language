# mario-level-language
Language for making Mario levels.

## Table of Contents
1. [Goal](#Goal)
<br/> 1.1 [Visualization](#Visualization)
<br/> 1.2 [Analysis](#Analysis)
2. [Implementation and Roles](#Implementation and Roles)
<br/> 2.1 [Fetching a Repository](#1.Fetching a Repository)
<br/> 2.2 [Static Analysis through ESLint](#2.Static Analysis through ESLint)
<br/> 2.3 [Data to Visualization](#3.Data to Visualization)
<br/> 2.4 [Recreative Front-End](#4.Recreative Front End)
3. [User Testing](#User Testing)
4. [Running the Project](#Running the Project)
<br/> 4.1 [Required Tools](#Required Tools)
<br/> 4.2 [First Method](#First Method)
<br/> 4.3 [Second Method](#Second Method(Easier for testing specific FrontEnd or BackEnd implementations))
5. [Testing the Project](#Testing the Project)
<br/> 5.1 [Optional Tools](#Optional Tools)
<br/> 5.2 [Testing Visualization With Postman (For Backend Only)](#Testing Visualization With Postman(For Backend Only))
<br/> 5.3 [First Method](#Testing with other tools)


## Goal
### Visualization
Our goal for this project was to create visual linting results using predefined eslint rules and display it in a fun and meaningful way. Therefore we decided to generate mario levels according to the linting errors output.
We fetch a JavaScript project from github and output a mario level using our project from DSL.

### Analysis
**Static Analysis:** We use ESLint to determine the linting errors in repository. ESLint is run through node and checks
for predefined rules(e.g. enforce semicolons, a line being to long), so we are using static checks for each file in a project.
<br/>
**Meta Analysis:** We use meta analysis with the project structure and sizes of the project.

## Implementation and Roles
#### 1.Fetching a Repository
Developed By: Kwangsoo Yeo<br/>
Based on a github repository, fetch the repository and grab all the relevant contents (all JavaScript Files excluding config files) and save them into the disk
with files and directories structured the same way as the original project. This is used later for getting
eslint results and generating levels. Delete all files once done with static checks of each file

#### 2.Static Analysis through ESLint
Developed By: Tongtong Zhai and Huanxin Zhang<br/>
Run ESLint to all the JavaScript files in the repository to get the errors, file size and number of lines of code.
For each file grab all the errors, the error type, number of line the error occurred and generate a output for basing the
mario levels off.

#### 3.Data to Visualization
Developed By: Christopher Powroznik<br/>
Based on the output generated in the previous step, create a mario level for each file. The level will be dynamically created
given the size of the file(determines how large the map will be), and create obstacles given the errors from the the ESLint
results. The ESLint results can be classified and easy, medium hard level.  This determines the difficulty the obstacles are place
in each map which reflects partially how bad the linting is done in a specific file. 
After generating a map for each file, save the img with correct path to the directory and save it to the zip file.
This language generator is done with our previous project, creating the mario dsl.

#### 4.Recreative Front End
Developed By: Kevin Zhu<br/>
Create a front end that would help a user test a repo based on the implementations above. A input filed for a github repo
would call the server to generate images for each JavaScript file. The files are compressed into a zip file and
sent back to the user so that it can download the images and check the linting results as a mario level.

## User Testing
We specifically ask users the answer some of the questions from this [form](https://docs.google.com/forms/d/e/1FAIpQLSd15hrHZnZCIOzTQCN85aCNxdyv25kwa7U-oivkR48-tw60kw/viewform). 
<br/>
General Questions:
- Have you played mario brothers?
- Do you know JavaScript?
- Do you know ESLint?

Visualization Specific Questions: (Based on the image generated)
- Do you think a specific file has linting errors?
- How large do you think this file is?
- Do you think the image helps you see where the linting error is located?

## Running the Project
### Required Tools
1. [Docker](https://www.docker.com/products/docker-desktop)
2. Node(v10) and NPM(Node Package Manager)¡

### First Method
1. Initiate Docker.
2. On the root directory run `npm run restart-docker`.

### Second Method(Easier for testing specific FrontEnd or BackEnd implementations)
1. On the root direcotry run `sh install-dependencies.sh`. (Once every time new dependencies are added)
2. To run the front-end.
>1. Go to the frontend directory `cd frontend`
>2. `npm run start`
>3. frontend is hosted on [http://localhost:3000](http://localhost:3000)
3. To run the back-end.
>1. Go to the backend directory `cd backend`
>2. `npm run build && npm run start`
>3. backend is hosted on [http://localhost:8080](http://localhost:8080)

## Testing the Project

### Optional Tools
1. [Postman](https://www.getpostman.com/downloads/)

### Testing Visualization With Postman(For Backend Only)
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
