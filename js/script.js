
document.getElementById('search_field').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        var request = new XMLHttpRequest();
        var findWiki = document.getElementById('search_field').value;
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
            document.getElementsByTagName('HEADER')[0].className = 'after_search';
            document.getElementsByTagName('MAIN')[0].style.display = 'block';
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
})


document.getElementsByClassName('clear')[0].addEventListener('click', function(){
	document.getElementsByTagName('HEADER')[0].classList.remove('after_search');
	document.getElementsByTagName('MAIN')[0].style.display = 'none';
})

