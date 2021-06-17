const fetch = require('node-fetch');
const htmlParser = require('node-html-parser');
const { parse: ingrediantParser } = require('recipe-ingredient-parser-v3');

let mappingValues = {
  '¼': [1, 4],
  '½': [1, 2],
  '¾': [3, 4],
  '⅓': [1, 3],
  '⅔': [2, 3],
  '⅕': [1, 5],
  '⅖': [2, 5],
  '⅗': [3, 5],
  '⅘': [4, 5],
  '⅙': [1, 6],
  '⅚': [5, 6],
  '⅛': [1, 8],
  '⅜': [3, 8],
  '⅝': [5, 8],
  '⅞': [7, 8],
};

function parseJsonLDtoRecipe(root) {
  let res = {
    steps: [],
    ingrediants: [],
  };

  for (let step of root.recipeInstructions) {
    res.steps.push(step.text);
  }

  for (let ingrediant of root.recipeIngredient) {
    res.ingrediants.push(ingrediant);
  }

  res.name = root.name;
  res.yields = root.recipeYield;
  res.parsedFrom = root.url;
  res.imageUrl = root.thumbnailUrl;
  return res;
}

async function parse(url) {
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.text().then((res) => {
        const root = htmlParser.parse(res);
        let scripts = root.querySelectorAll('script');
        for (let i = 0; i < scripts.length; i++) {
          if (scripts[i].rawAttributes.type === 'application/ld+json') {
            return parseJsonLDtoRecipe(JSON.parse(scripts[i].rawText));
          }
        }
      });
    }
  });
}

module.exports = parse;
