# ToDo-List

This project is a simple todo-list application with angular on the frontend and node.js and MYSQL on the backend.

## PreRequisites ##
1- node.js and npm installed  
2- angular CLI installed  
3- MYSQL server running  

## Setup Instructions ##
Follow the below steps to run the application on your end:  

1- Clone the repository using the command ```git clone https://github.com/Ahm3d-Shaikh/ToDo-List.git```  
2- Run ```npm install``` in the main directory of the project.  
3- Create a .env file in the backend directory which should have the following variables:  
   (a) HOST  
   (b) ROOT  
   (c) PASSWORD  
   (d) DATABASE  
4- Go to the src directory and run ```ng build --configuration production``` to build your project.  
5- Go to the backend directory and run ```node server.js``` command to run your server.  
6- You can now use the application by navigating to the URL: http://localhost:3000/  
