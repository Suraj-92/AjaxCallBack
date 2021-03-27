let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes + "Min:" + date.getSeconds + "sec";
}


function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject){ 
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
        // console.log(methodType+ " State Changed Called at: "+showTime()+" RS: " + xhr.readyState + " Status: " + xhr.status);
            if (xhr.readyState === 4){
                if (xhr.status === 200 || xhr.status ===201){
                    resolve(xhr.responseText);
                }
            else if (xhr.status >= 400){
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText 
                });
                console.log("Handle 400 client Error or 500 Server Error at: " + showTime());
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data){
        // console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }
    else xhr.send();
    console.log(methodType + " request sent to the server at: " + showTime());
    });
}

const getURL = "http://127.0.0.1:3000/employee/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at: "+ showTime() + " data: " + responseText)
    })
    .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));
console.log("Make GET AJAX Call to Server at " + showTime());

const deleteURL = "http://localhost:3000/employee/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: " + responseText)
    })
    .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));

const postURL = "http://localhost:3000/employee";
const emplData = {"name": "test", "gender": "male", "departMent": [ "HR" ], "salary": "30000", "startDate": "1 Jan 2020", "notes": "", "id": 4, "profileUrl": "../assets/profile-images/Ellipse -3.png"};
