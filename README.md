# Frontend data
This repo is for the frontend data course assignments of the Information Design Tech Track. In this course we will learn about visualising data with the [D3.js library](https://d3js.org/). I will create an interactive map that plots geojson data on the map and lets the user interact with it.  

![Thinking The Hangover gif](https://media1.tenor.com/images/d955eb63f22e146e4c6fabe4029d90f4/tenor.gif?itemid=10422478)  
_(https://media1.tenor.com/images/d955eb63f22e146e4c6fabe4029d90f4/tenor.gif?itemid=10422478)_
***
## Debriefing
The newspaper 'De Volkskrant' wants to get interesting insights on connections in the RDW datasets. It is our job to find interesting information in the datasets, and make a data visualization about that information/subject. De Volkskrant can that see if they can use the information shown to write an interesting article.
They gave us the option to use the datasets from the RDW, but we can also look for other interesting datasets as long as it has to do with 'the car in the city'.  
Click [here](https://github.com/BVictorB/functional-programming/wiki/Research-datasets) for some information on some RDW datasets.

![De Volkskrant](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Volkskrant.svg/1200px-Volkskrant.svg.png)  
_(https://nl.wikipedia.org/wiki/Bestand:Volkskrant.svg)_
***
## Assignments
Make a data visualisation with the [D3.js library](https://d3js.org/) where the user can interact with the data that is being shown. Fetch data from an API, convert it to something that you can use. Add, update and remove data depending on user input. Make a visualisation that explains itself.
***
## Concept
My idea for this project is to retrieve data from the [RDW datasets](https://opendata.rdw.nl/browse) and from the [datasets of the city of Amsterdam](https://data.amsterdam.nl/) to make an interactive map. I want to plot out different parking areas on the map, with the different prices that are being used. If I can get the data of the history of these parking prices, I want to be able to scroll through time and see how the prices have changed. I also want to plot all the parking garages in Amsterdam on the map, and see when they opened and compare this to the changes in parking prices. And if I have the data for it, I would also like to compare the prices of the parking garages to the prices of parking on the street (also going back in history).

### Research question(s)
I have created a few research questions to support my research. There is a main research question that I find most important in my assignment, I will mostly focus on this one. But I will also try to implement answering assets/features for the other research questions.
### **_Is there a connection between the increasing parking prices and the opening of new parking garages in Amsterdam?_**
- _**Is it cheaper to park in a parking garage or on the street (for each district)?**_
- _**Is the parking garage accessible for disabled people?**_
- _**Are there any benefits in the parking garages that are more expensive? (location, electric charging, accessibility)**_
- _**Is it free to park at night in the parking garages compared to on the street?**_

If you want to read more about my concept, research questions and the datasets that I will need, click [here](https://github.com/BVictorB/functional-programming/wiki/RDW-Concept)

![Car parking gif](https://media1.tenor.com/images/ab7c163110442028965e67232a0ebf60/tenor.gif?itemid=17599579)  
_(https://tenor.com/view/meeting-bad-parking-car-break-glass-fail-gif-17599579)_
***
## Installing
- Clone this repo
```
git clone https://github.com/BVictorB/frontend-data.git .
```
- Install all NPM packages (run this command in both main folders where the package.json file is located)
```
npm i
```
- Execute the parcel script to compile everything and start a local static server (http://localhost:1234/)
```
npm run dev
```
![CLI gif](https://media1.tenor.com/images/356bac3dd24014fd740d196138f3d0f8/tenor.gif?itemid=10933901)  
_(https://tenor.com/view/command-line-site-not-ready-message-comment-gif-10933901)_
***
## Sources
- [MDN](https://developer.mozilla.org/)
- [D3](https://github.com/d3/d3/wiki)
- [Data Visualization Course 2018 (by Curran Kelleher)](https://curran.github.io/dataviz-course-2018/)
