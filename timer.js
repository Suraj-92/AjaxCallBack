function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes + "Min:" + date.getSeconds + "sec";
}

function showSessionExpire() {
    console.log("Activity-B: Your Session Expired At " + showTime());
}

console.log("Activity-A: Trigerring Activity-B at " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity-A: Triggered Activity-B at " + showTime() + " will excute after 5 seconds ");
