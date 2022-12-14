# CYolo - File Sharing Demo

By Dror Avidov - [just2click@gmail.com](me:just2click@gmail.com) - [052-5584006](tel:0525584006)

## Project Details

This is a client server (i.e. Fullstack) project to demonstrate that one can setup such a project.

The client is developed using React 18, React Mui library and Jest for testing
The client features a simple "Home Page" with a card component that lets the user upload an image to the server.
Alongside the image the client should also set a file retention period, in minutes

I've added a single test using Jest to test the file retention input

If the file upload is successful a modal popup with a link that may be copied (clicking on the link/icon would do that).
This link may be used to access this image. Once the image is removed from the server the link will return an error message

The server is developed using Node.js, Express and some more Node based libraries.
The sever handles saving of files, the server basically supports saving more than one file and it uses an internal
array to keep track of the files (in a real-world system this would probably stored in a database)

After a file is uploaded the sever starts a 'setInterval' function that looks for each file and checks it's expiry time
If it was reached the server would remove the file

## Start Here:

Go into the client folder and run:

### `npm i`

Go into the sever folder and run:

### `npm i`

## Available Scripts (Client side)

In the project directory, you can run:

### `npm start`

or

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Available Scripts (Server side)

In the project directory, you can run:

### `node index.js`
