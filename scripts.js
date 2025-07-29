// Add your API endpoint here
var API_ENDPOINT = "YOUR_API_END_POINT-from-AWS-API-GATEWAY";

// AJAX POST request to save Employee data
document.getElementById("savereview").onclick = function(){
    var inputData = {
        // "employeeid": $('#employeeid').val(),
        "Name": $('#Name').val(),
        "Genre": $('#Genre').val(),
        "Review": $('#Review').val()
    };
    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data:  JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            document.getElementById("ReviewSaved").innerHTML = "Review Data Saved!";
        },
        error: function () {
            alert("Error saving Review data.");
        }
    });
}

// AJAX GET request to retrieve all Employee
document.getElementById("getreview").onclick = function(){  
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $('#ReviewTable tr').slice(1).remove();
            jQuery.each(response, function(i, data) {          
                $("#ReviewTable").append("<tr> \
                    <td>" + data['Name'] + "</td> \
                    <td>" + data['Genre'] + "</td> \
                    <td>" + data['Review'] + "</td> \
                    </tr>");
            });
        },
        error: function () {
            alert("Error retrieving Review data.");
        }
    });
}
