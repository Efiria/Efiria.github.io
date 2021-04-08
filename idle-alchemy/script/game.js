const version = 'v0.1'

let total = 0

function startGame() {
    
    var save = decodeURIComponent(document.cookie);
    // var save = document.cookie;
    console.log(save)

    document.getElementById("version").innerHTML = version;
    document.getElementById("total").innerHTML = total;
}

function updateTotal(newTotal) {
    document.getElementById("total").innerHTML = newTotal;
    save()
}

function count(value) {
    total = total + value
    updateTotal(total)
}

function save() {
    var d = new Date();
    d.setTime(d.getTime() + (100*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "alchemySave" + "=" + total + ";" + expires + ";path=/";
    document.cookie = 'cookie1=test; expires=Fri, 19 Jun 2025 20:47:11 UTC; path=/'
}