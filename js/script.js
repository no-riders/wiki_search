const query = document.getElementById('search_field');
const btn = document.getElementById('btn');
const header = document.getElementsByTagName('HEADER')[0];
const main = document.getElementsByTagName('MAIN')[0];
const footer = document.getElementsByTagName('FOOTER')[0];

query.addEventListener('keydown', () => {
    btn.style.display = "inline-block";
})

query.addEventListener('keypress', event => {
    if (event.keyCode == 13) {
        event.preventDefault();
        btn.click();
    }
})

btn.addEventListener('click', () => {
    const request = new XMLHttpRequest();
    const findWiki = query.value;
    request.open('GET', `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${findWiki}`);
    request.onload = () => {
      footer.style.display = 'block';
        const title = [];
        const content = [];
        const wikiUrl = [];
        const listTitles = document.getElementById('list').getElementsByTagName('h4');
        const listContent = document.getElementById('list').getElementsByTagName('p');
        const url = document.getElementById('list').getElementsByTagName('a');
        const data = JSON.parse(request.responseText);
        const arr = Object.keys(data.query.pages).map(e => //obj to arr
        [Number(e), data.query.pages[e]]);

        header.className = 'after_search';
        main.style.display = 'block';
        for (let i = 0; i < arr.length; i++) {
            title.push(arr[i][1].title);
            content.push(arr[i][1].extract);
            wikiUrl.push(arr[i][1].pageid);
            listTitles[i].innerHTML = title[i];
            listContent[i].innerHTML = content[i];
            url[i].href = `https://en.wikipedia.org/?curid=${wikiUrl[i]}`;
        }
    }
    request.send()
});

document.getElementsByClassName('clear')[0].addEventListener('click', () => {
  footer.style.display = 'none';
    btn.style.display = 'none';
    header.classList.remove('after_search');
    main.style.display = 'none';
})
