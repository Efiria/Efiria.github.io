const version = 'v0.1'
const saveName = 'alchemySave'

let total = 0

function startGame() {
    
    document.getElementById("version").innerHTML = version;
    
    var save = getCookie(saveName)
    if (save != null) {
        document.getElementById("total").innerHTML = save;
    } else {
        document.getElementById("total").innerHTML = total;
    }    
    
    //save every 5 min
    window.setInterval(function(){
        save()
    }, 300000);
}

function updateTotal(newTotal) {
    document.getElementById("total").innerHTML = newTotal;
}

function count(value) {
    total = total + value
    window.setInterval(function(){
        total += value;
        updateTotal(total)
    }, 1000);
    updateTotal(total)
}




function save() {
    var d = new Date();
    d.setTime(d.getTime() + (100*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = saveName + "=" + total + ";" + expires + ";path=/";
}

function deleteSave() {
    total = 0
    updateTotal(total)
    document.cookie = saveName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }