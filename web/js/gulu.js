/*

Ahmet#0001 - @tatli.php

*/


setInterval(() => {
    stats();
}, 2500);
stats();
function stats() {
let sunucuElement = document.getElementById("sunucu");
let kullaniciElement = document.getElementById("kullanici");
let kanalElement = document.getElementById("kanal");

let request = new XMLHttpRequest();

request.open("GET", "http://Sunucu IP Adresi:8080/api", true);

request.onload = () => {
    if (request.readyState == 4 && request.status == 200) {
        let data = JSON.parse(request.responseText);
        if (sunucuElement) {
            sunucuElement.innerHTML = data.sunucu.toLocaleString();
        }
        if (kullaniciElement) {
            kullaniciElement.innerHTML = data.kullanici.toLocaleString();
        }
        if (kanalElement) {
            kanalElement.innerHTML = data.kanal.toLocaleString();
        }
    }
};
request.send();
}
