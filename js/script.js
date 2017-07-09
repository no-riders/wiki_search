var query = document.getElementById('search_field');
var btn = document.getElementById('btn');
var header = document.getElementsByTagName('HEADER')[0];
var main = document.getElementsByTagName('MAIN')[0];
var footer = document.getElementsByTagName('FOOTER')[0];

query.addEventListener('keydown', function() {
    btn.style.display = "inline-block";
})

query.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        btn.click();
    }
})

btn.addEventListener('click', function() {
    var request = new XMLHttpRequest();
    var findWiki = query.value;
    request.open('GET', 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + findWiki + '');
    request.onload = function() {
      footer.style.display = 'block';
        var title = [];
        var content = [];
        var wikiUrl = [];
        var listTitles = document.getElementById('list').getElementsByTagName('h4');
        var listContent = document.getElementById('list').getElementsByTagName('p');
        var url = document.getElementById('list').getElementsByTagName('a');
        var data = JSON.parse(request.responseText);
        var arr = Object.keys(data.query.pages).map(function(e) { //obj to arr
           return [Number(e), data.query.pages[e]];
        })

        header.className = 'after_search';
        main.style.display = 'block';
        for (var i = 0; i < arr.length; i++) {
            title.push(arr[i][1].title);
            content.push(arr[i][1].extract);
            wikiUrl.push(arr[i][1].pageid);
            listTitles[i].innerHTML = title[i];
            listContent[i].innerHTML = content[i];
            url[i].href = 'https://en.wikipedia.org/?curid=' + wikiUrl[i];
        }
    }
    request.send()
});

document.getElementsByClassName('clear')[0].addEventListener('click', function() {
  footer.style.display = 'none';
    btn.style.display = 'none';
    header.classList.remove('after_search');
    main.style.display = 'none';
})
