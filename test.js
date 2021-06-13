let recipeParser = require('./server/recipeParser');
const {parse} = require('node-html-parser');
const fs = require('fs');
const pattern = /href="(recipe\/[a-zA-Z-]+)/;
const fetch = require('node-fetch');


async function test (err, val) {
    let text = val.toString('utf-8');
    let temp = parse(text);
    let links = temp.querySelectorAll('a');
    let res = {};
    for (let link of links) {
        if (link.rawAttrs.includes('href="recipe/')) {
            const match = link.rawAttrs.match(pattern);
            console.log(match[1]);
            res[match[1]] = 1;
        }
    }
    let keys = Object.keys(res);

    for (let key of keys) {
        let fullUrl = `https://www.bonappetit.com/${key}`;
        let res = await fetch('https://solo-recipe-project.herokuapp.com/recipe/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: fullUrl
            })
        }).then(res => {
            console.log(`[${fullUrl}] = [${res.ok}]`);
            return res.text();
        });
        console.log(res);
    }
}

console.log(fs.existsSync(__dirname + '/test.html'));
fs.readFile(__dirname + '/test.html', test);


