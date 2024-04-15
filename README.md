# WeatherApp-MERN-Redux-REST


An MERN Implementation of a Weather App and REST APIs. 

This project is a comprehensive weather application built with ReactJS, Node.js, Express.js, MongoDB, and Redux. It utilizes REST APIs for fetching weather data, Redux for state management, LocalStorage for persisting user preferences, and MongoDB for storing historical weather data.

Demo: https://docs.google.com/document/d/1RmDrlzy84t3YiOL47BNq5Y_53Hhhm_gIoEpNPAWMwTo/edit?usp=sharing
Portfolio : https://chandhanu.com 

Features
--------
1. Weather Lookup: Users can search for weather information by zip code.
2. Temperature Metric Selection: Users can choose between Celsius and Fahrenheit.
3. Historical Data: The application stores and displays historical weather data.
4. LocalStorage Integration: User preferences and recent searches are saved in the browser's LocalStorage.
5. MongoDB Integration: Historical weather data is stored in a MongoDB database.

Technologies Used
-----------------
1. Frontend: ReactJS for building the user interface.
2. Backend: Node.js and Express.js for creating the server and handling API requests.
3. Database: MongoDB for storing historical weather data.
4. State Management: Redux for managing application state.
5. Local Storage: For persisting user preferences and recent searches.
6. APIs: OpenWeather APIs, REST APIs for fetching weather data.

Prerequisites
--------------
Node.js and npm installed on your machine.
MongoDB installed and running.

# Implementations
1. Functional Components with Hooks
-----------------------------------
- This implementation uses React's functional components and 
- Hooks for state management and side effects. 
- This is fairly a simple implementation that takes in String(CityName)  as input and displays the weather information 
- API: https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${api-key}
- It demonstrates using useState and useEffect hooks for managing component state and lifecycle events.


2. Class Components with Redux, LocalStorage, and MongoDB Integration
----------------------------------------------------------------------
- This implementation uses React's class components, 
- Redux for state management, 
- LocalStorage for persisting user preferences, 
- MongoDB for storing historical weather data. 
- It demonstrates the integration of these technologies in a weather application.
- API: http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid={api-key}


Demo: https://docs.google.com/document/d/1RmDrlzy84t3YiOL47BNq5Y_53Hhhm_gIoEpNPAWMwTo/edit?usp=sharing

Time Taken : 
------------
- Backend Structure: 4 hours 
- API endpoints: 4 hours 
- MongoDB integration - 2 hours 
- Testing API endpoints and Bug Fixes : 3 hours 
- React App with redux: 8 hours 
- Bug Fixes - 5 hours (Git revert)
- Frontend-backend integration - 4 hours 
- Stylization - 4 hours
- Refactoring - 2 hours  
- Hosting - 2 hours 



Challenges faced: 	
------------------
- API Integration and Data Fetching
Initial Structure with Zip Code: The decision to use OpenWeatherMap's API, which requires a zip code for weather data, was made to optimize the use of the 48-hour deadline. This choice meant that the application initially focused on zip code lookups rather than city names, which could have been more user-friendly.
- Database Integration
MongoDB Integration: Integrating MongoDB for storing historical weather data was a significant challenge. Ensuring that the database could efficiently handle the volume of data and provide quick access to historical weather information was crucial.
- State Management and Persistence (Using online resources and tutorials )
Redux and LocalStorage: Implementing Redux for state management and LocalStorage for persisting user preferences and recent searches added complexity to the application. Ensuring that these technologies worked seamlessly together was a challenge.
- Testing and Debugging
API Endpoints and Bug Fixes: Testing the API endpoints and fixing bugs was a time-consuming process. This included not only fixing issues with the application's functionality but also ensuring that the application was robust and could handle various edge cases.
Project Management and Time Management
- Time Allocation and Prioritization: Managing the project within a tight deadline was a challenge. Prioritizing tasks and ensuring that the most critical features were implemented first was crucial.
- Hosting and Deployment
Hosting and Deployment Challenges: Deploying the application and ensuring that it was accessible and performant was a challenge. This included setting up the hosting environment and ensuring that the application could handle the expected load.
