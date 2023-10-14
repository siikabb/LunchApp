import './style.css';
import {apiUrl} from './variables';

const fetchData = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const json = response.json();
  return json;
};

const restaurants: Restaurant[] = await fetchData(apiUrl + 'restaurants');

restaurants.forEach((restaurant) => {
  const element = document.getElementById('app');
  if (element) {
    const p = document.createElement('p');
    p.innerText += `${restaurant.name}`;
    element.appendChild(p);
  }
});
