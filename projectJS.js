var i = 1;
var j = 1;

$(document).ready(loadPage);

function loadPage()
{
    console.log("Load Characters via ajax");

    $.ajax({
        url: "https://rickandmortyapi.com/api/character/?page=" + i,
        type: "GET",
        dataType: "json",
        success: showCharacters,
        error: showError        
    });

    console.log("Load Locations via ajax");

    $.ajax({
        url: "https://rickandmortyapi.com/api/location/?page=" + j,
        type: "GET",
        dataType: "json",
        success: showLocations,
        error: showError        
    });
}

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

function showError()
{
    console.log("ERROR!");
}

function showCharacters(page)
{
    console.log("Show Character names:" + page);

    for (var x in page["results"])
    {    
        var data = page["results"][x];
        displayChar(data);        
    }
}

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

function showLocations(page)
{
    console.log("Show Locations.");

    for (var x in page["results"])
    {
        var data = page["results"][x];
        displayLoc(data);
    }
}

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

function pagination(i)
{
    $("#character_table").find("tr:gt(0)").remove();
    loadCharacters(i);
}

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

function locPagination(j)
{
    $("#location_table").find("tr:gt(0)").remove();
    loadLocations(j);
}

