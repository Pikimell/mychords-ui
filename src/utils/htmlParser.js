export function parseHtmlChords(url, html) {
  if (url.includes('amdm.ru')) {
    return parseAmDmChords(html);
  } else if (url.includes('mychords.net')) {
    return parseMyChords(html);
  } else {
    return document.createElement('div');
  }
}

function parseMyChords(html) {
  const el = document.createElement('html');
  let htmlString = html.replaceAll('b-accord__symbol', 'podbor__chord');
  htmlString = htmlString.replaceAll('w-words__text', 'podbor__text');
  let bodyContent = htmlString.match(/<body>[\s\S]*?<\/body>/);
  el.innerHTML = bodyContent;
  const podbor = el.querySelector('.podbor__text');
  const content = podbor.innerHTML.replaceAll(/class=".*"/g, '');
  return content;
}

function parseAmDmChords(html) {
  const el = document.createElement('html');
  el.innerHTML = html.replace(/<style[\s\S]*?<\/style>/gi, '');

  const podbor = el.querySelector('.b-podbor__text');
  podbor.querySelector('.podbor-format')?.remove();
  const content = podbor.innerHTML;
  const regex = /<pre\b[^>]*>([\s\S]*?)<\/pre>/;
  const matches = content.match(regex);
  let result = matches[1]
    .replaceAll(/<div .*">/g, '')
    .replaceAll(/<\/div>/g, '');

  return result;
}
