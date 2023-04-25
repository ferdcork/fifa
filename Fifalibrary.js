var url = "https://raw.githubusercontent.com/b-mcavoy/datasets/main/Sports/FIFA%20Men's%20World%20Cup%20Results.csv"
function getColumn(url, columnNumber){
  var column = [];
  var table = [];
  var request = new XMLHttpRequest();  
  request.open("GET", url, false);   
  request.send(null);  
  var csvData = new Array();
  var jsonObject = request.responseText.split(/\r?\n|\r/);
  for (var i = 0; i < jsonObject.length; i++) {
    csvData.push(jsonObject[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
  }
  table = csvData;
  column = getCol(table, columnNumber);
  return column;
}

//returns the specified column from a 2D Array
function getCol(matrix, col){
       var column = [];
       for(var i=1; i<matrix.length-1; i++){
          column.push(matrix[i][col]);
       }
       return column;
    }

var champions = getColumn(url, 4);
var hosts = getColumn(url, 3);
var participatingTeams = getColumn(url, 10);
var years = getColumn(url, 2);
var second = getColumn(url, 7);
var third = getColumn(url, 8);
var fourth = getColumn(url, 9);
var venues = getColumn(url, 6);

/*Takes a soccer team and gives the number of world Cup wins that team has.
team {string} - the team
count {integer} - keeps track of how many times the team has won.

*/
function getWins(team){
  var count = 0;
  for (var i = 0; i < champions.length; i++){
    if (champions[i].toLowerCase().includes(team.toLowerCase())){
      count += 1;
    }
  }
  return count;
}


/* Takes the 2nd, 3rd, and 4th place teams from any world cup and gives the champion of that world cup.
secPlace {string} - the second place team
thirdPlace {string} - the third place team
fourthPlace {string} - the fourth place team
matches {string} - holds the first place team name
*/
function getChampion(secPlace, thirdPlace, fourthPlace){
  var matches = "";
  for (var i = 0; i < champions.length; i++){
    if (second[i].toLowerCase().includes(secPlace.toLowerCase()) && third[i].toLowerCase().includes(thirdPlace.toLowerCase()) && fourth[i].toLowerCase().includes(fourthPlace.toLowerCase())){
      matches = champions[i];
    }
  }
  if (matches.length == 0){
    matches = "Sorry, there are no instances where these teams were in the playoffs.";
  }
  return matches;
}


//get the number of participating teams by using the year datas.
//'Year'is the string and 'matches' is the integer.
function getParticipations(year){
  matches = "";
  for(var i = 0; i < years.length; i++){
    if(years[i] == year){
     matches = participatingTeams[i];
    }
  }
  if( matches.length == 0){
    matches = "The World Cup was not played this year."
  }
  return matches;
}


//get the hosts of the world cups by using the year datas.
//'year'is the string and 'matches'is the integer.
function gethosts(year){
  matches = "";
  for(var i = 0; i<years.length; i++){
    if(years[i] == year){
      matches = hosts[i];
    }
  }
if(matches.length == 0){
  matches = "The World cup was not held this year."
}
  return matches;
}



/* takes a year that the world cup was played and gives the venue of the championship game for that year.
year {string} - the chosen year.
matches {string} - holds the venue name onces it matches with the year.
*/
function getVenueOfChampionship(year){
  matches = "";
  for (var i = 0; i < champions.length; i++){
    if( years[i] == year){
      matches = venues[i];
    }
    
  }
  if( matches.length == 0){
    matches = "The World Cup was not played this year."
  }
  return matches;
}
