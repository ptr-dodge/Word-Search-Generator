import { wordSearch } from "./generator.js"


function displayWordList(words) {
    const wordListElement = document.createElement("ul");
    for (const word of words) {
        const wordListItem = document.createElement("li");
        wordListItem.textContent = word.toLowerCase();
        wordListElement.appendChild(wordListItem);
    }
    document.body.appendChild(wordListElement);
}

function displayGridInHtml(matrix) {
    let html = '<table>'
    for (const row of matrix) {
        html += '<tr>'
        for (const cell of row) {
            html += '<td>' + cell + '</td>'
        }
        html += '</tr>'
    }
    html += '</table>'
    document.querySelector("#wordSearch").innerHTML += html
}

let genButton = document.querySelector("#generate")
genButton.onclick = () => {
    let gridLength = document.querySelector("#length").value
    let gridHeight = document.querySelector("#height").value
    let words = ["survivor", "usurp", "invite", "dry", "strike", "permanent", "monster", "money", "facility", "baby", "bomber", "hair", "cigarette", "thinker", "disagreement"]

    let search = new wordSearch(words, gridHeight, gridLength)
    displayGridInHtml(search)
    displayWordList(words)
}