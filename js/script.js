var query = document.getElementById('search_field');
var btn = document.getElementById('btn');
var header = document.getElementsByTagName('HEADER')[0];
var main = document.getElementsByTagName('MAIN')[0];


function search() {
    var request = new XMLHttpRequest();
    var findWiki = query.value;
    request.open('GET', 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + findWiki + '');
    request.onload = function() {
        var title = [];
        var content = [];
        var wikiUrl = [];
        var listTitles = document.getElementById('list').getElementsByTagName('h4');
        var listContent = document.getElementById('list').getElementsByTagName('p');
        var url = document.getElementById('list').getElementsByTagName('a');
        var data = JSON.parse(request.responseText);
        var arr = Object.values(data.query.pages) //object values to arr
        header.className = 'after_search';
        main.style.display = 'block';
        for (var i = 0; i < arr.length; i++) {
            title.push(arr[i].title);
            content.push(arr[i].extract);
            wikiUrl.push(arr[i].pageid);
            listTitles[i].innerHTML = title[i];
            listContent[i].innerHTML = content[i];
            url[i].href = 'https://en.wikipedia.org/?curid=' + wikiUrl[i];
        }
    }
    request.send()
}

query.addEventListener('keydown', function() {
    btn.style.display = "inline-block";
})

btn.addEventListener('click', function() {
    search();
});

query.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        btn.click();
        // search();
    }
})

document.getElementsByClassName('clear')[0].addEventListener('click', function() {
    btn.style.display = "none";
    header.classList.remove('after_search');
    main.style.display = 'none';
})