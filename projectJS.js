$(document).ready(loadCharacters);
 
var i = 1;

function loadCharacters(i)
{
    console.log("Load Characters via ajax");

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
        display(data);        
    }
}

function display(data)
{
    character_data = '';
    character_data += '<tr id="row">';
    character_data += '<td>' + data["id"] + '</td>';
    character_data += '<td>' + data["name"] + '</td>';
    character_data += '<td>' + data["status"] + '</td>';
    character_data += '<td>' + data["species"] + '</td>';
    character_data += '<td>' + data["gender"] + '</td>';
    character_data += '<td>' + data["origin"]["name"] + '</td>';
    character_data += '</tr>';
    $('#character_table').append(character_data);
}

//$('#row').click(function()
//{

//})

function pagination(i)
{
    $("#character_table").find("tr:gt(0)").remove();
    loadCharacters(i);
}