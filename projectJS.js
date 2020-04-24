//Variable declaration
var i = 1;
var j = 1;
var k = 1;

//Calls loadPage when the document is ready.
$(document).ready(loadPage);

/** This function loads the content needed from the Rick and Morty API via 
 * ajax requests. This function is called when the document loads.
 */
function loadPage()
{
    console.log("Load Characters via ajax");

    $.ajax({
        url: "https://rickandmortyapi.com/api/character/?page=1",
        type: "GET",
        dataType: "json",
        success: showCharacters,
        error: showError        
    });

    console.log("Load Locations via ajax");

    $.ajax({
        url: "https://rickandmortyapi.com/api/location/?page=1",
        type: "GET",
        dataType: "json",
        success: showLocations,
        error: showError        
    });

    console.log("Load Episodes via ajax");

    $.ajax({
        url: "https://rickandmortyapi.com/api/episode/?page=1",
        type: "GET",
        dataType: "json",
        success: showEpisodes,
        error: showError        
    });
}

/** This function loads only characters via ajax request. Used when
 * the user is scrolling through the character pages.
 */
function loadCharacters()
{
    console.log("Load Characters via ajax");
    
    fixPagination(i);

    $.ajax({
        url: "https://rickandmortyapi.com/api/character/?page=" + i,
        type: "GET",
        dataType: "json",
        success: showCharacters,
        error: showError        
    });
}

/** Used if there is an error */
function showError()
{
    console.log("ERROR!");
}

/** This functions sorts through the JSON coming from the web API
 * and reads in the wanted character data.
*/
function showCharacters(page)
{
    console.log("Show Character names:" + page);

    for (var x in page["results"])
    {    
        var data = page["results"][x];
        displayChar(data);        
    }
}

/** This function is used to display the acquired character data on 
 * the webpage in the form of a table.
 */
function displayChar(data)
{
    var character_data = '';
    character_data += '<tr id="row">';
    character_data += '<td>' + data["id"] + '</td>';
    character_data += '<td>' + "<a href='" + data["image"] + "'>" + data["name"] + '</a></td>';
    character_data += '<td>' + data["status"] + '</td>';
    character_data += '<td>' + data["species"] + '</td>';
    character_data += '<td>' + data["gender"] + '</td>';
    character_data += '<td>' + data["origin"]["name"] + '</td>';
    character_data += '</tr>';
    $('#character_table').append(character_data);
}

/** This function loads only locations via ajax request. Used when
 * the user is scrolling through the location pages.
 */
function loadLocations()
{
    console.log("Load Locations via ajax");
    
    fixLocPagination(j);

    $.ajax({
        url: "https://rickandmortyapi.com/api/location/?page=" + j,
        type: "GET",
        dataType: "json",
        success: showLocations,
        error: showError        
    });
}

/** This functions sorts through the JSON coming from the web API
 * and reads in the wanted location data. 
 */
function showLocations(page)
{
    console.log("Show Locations.");

    for (var x in page["results"])
    {
        var data = page["results"][x];
        displayLoc(data);
    }
}

/** This function is used to display the acquired location data on 
 * the webpage in the form of a table.
 */
function displayLoc(data)
{
    var location_data = '';
    location_data += '<tr id="row1">';
    location_data += '<td>' + data["id"] + '</td>';
    location_data += '<td>' + data["name"] + '</td>';
    location_data += '<td>' + data["type"] + '</td>';
    location_data += '<td>' + data["dimension"] + '</td>';
    location_data += '</tr>';
    $('#location_table').append(location_data);
}

/** This function loads only episodes via ajax request. Used when
 * the user is scrolling through the episodes pages.
 */
function loadEpisodes(k)
{
    console.log("Load Episodes via ajax");
    
    fixEpPagination(k);

    $.ajax({
        url: "https://rickandmortyapi.com/api/episode/?page=" + k,
        type: "GET",
        dataType: "json",
        success: showEpisodes,
        error: showError        
    });
}

/** This functions sorts through the JSON coming from the web API
 * and reads in the wanted episode data. 
 */
function showEpisodes(page)
{
    console.log("Show episodes.");

    for (var x in page["results"])
    {
        var data = page["results"][x];
        displayEpisodes(data);
    }
}

/** This function is used to display the acquired episode data on 
 * the webpage in the form of a table.
 */
function displayEpisodes(data)
{
    var episode_data = '';
    episode_data += '<tr id="row">';
    episode_data += '<td>' + data["id"] + '</td>';
    episode_data += '<td>' + data["name"] + '</td>';
    episode_data += '<td>' + data["air_date"] + '</td>';
    episode_data += '<td>' + data["episode"] + '</td>';
    episode_data += '</tr>';
    $('#episode_table').append(episode_data);
}

/** Fixes character pagination so the next and prev buttons
 * disappear when necessary. Also displays current page number.
 */
function fixPagination(i)
{
    if (i == 1)
    {
        $("#prev").addClass("hidden");
        $("#next").removeClass("hidden");
    }
    else if (i < 25)
    {
        $("#prev").removeClass("hidden");
        $("#next").removeClass("hidden");
    }
    else
    {
        $("#next").addClass("hidden");
        $("#prev").removeClass("hidden")
    }
    
    var pageNum = '<p>Page ' + i + '</p>';
    $("#pageNum").empty()
    $("#pageNum").append(pageNum);
}

/**Removes the characters and calls loadCharacters when a 
 * characters page is changed.
 */
function pagination(i)
{
    $("#character_table").find("tr:gt(0)").remove();
    loadCharacters(i);
}

/** Fixes location pagination so the next and prev buttons
 * disappear when necessary. Also displays the current page number.
 */
function fixLocPagination(j)
{
    if (j == 1)
    {
        $("#prev1").addClass("hidden");
        $("#next1").removeClass("hidden");
    }
    else if (j < 4)
    {
        $("#prev1").removeClass("hidden");
        $("#next1").removeClass("hidden");
    }
    else
    {
        $("#next1").addClass("hidden");
        $("#prev1").removeClass("hidden");
    }
    
    var pageNum1 = '<p>Page ' + j + '</p>';
    $("#pNum").empty()
    $("#pNum").append(pageNum1);
}

/**Removes the locations and calls loadLocations when a 
 * locations page is changed.
 */
function locPagination(j)
{
    $("#location_table").find("tr:gt(0)").remove();
    loadLocations(j);
}

/** Fixes episode pagination so the current page number
 * appears.
 */
function fixEpPagination(k)
{
    if (k == 1)
    {
        var pageNum1 = '<p>Page ' + k + '</p>';
        $("#pageNum1").empty()
        $("#pageNum1").append(pageNum1);
    }
    else
    {
        var pageNum1 = '<p>Page ' + k + '</p>';
        $("#pageNum1").empty()
        $("#pageNum1").append(pageNum1);
    }
}

/**Removes the episodes and calls loadEpisodes when the 
 * episodes page is changed.
 */
function epPagination(k)
{
    $("#episode_table").find("tr:gt(0)").remove();
    loadEpisodes(k);
}
