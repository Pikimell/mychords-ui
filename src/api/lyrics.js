import axios from 'axios';
import { BASE_URL } from '../utils/constants';
BASE_URL;
export async function getHTML(url, long) {
  const data = {
    url,
    long,
  };

  const res = await axios.post(BASE_URL + '/html', data);
  return res.data;
}

export async function searchChords(query, key = 'chords') {
  const obj = {
    amdm: 'https://amdm.ru/search/?',
    chords: 'https://mychords.net/ru/search?',
  };

  const params = new URLSearchParams({
    q: query,
  });

  const url = obj[key] + params;
  const html = await getHTML(url);
  const items = parseItems(html, key);
  return items;
}

function parseItems(html, site) {
  const dom = document.createElement('html');
  dom.innerHTML = html;
  if (site === 'amdm') {
    const table = dom.querySelectorAll('table.items tr');
    const items = [...table].map(el => {
      const res = {
        index: el.children[0].textContent,
        artist: el.querySelector('.artist')?.textContent,
        title: el.querySelectorAll('.artist')[1]?.textContent,
        url: el.querySelectorAll('.artist')[1]?.href,
      };
      return res;
    });
    items.shift();
    return items;
  } else {
    const items = dom.querySelectorAll('a.b-listing__item__link');
    return items;
  }
}
