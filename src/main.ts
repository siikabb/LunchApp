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
  const restaurantTable = document.getElementById('restaurant_table');
  if (restaurantTable) {
    restaurantTable.insertAdjacentHTML(
      'beforeend',
      `<tr><td>${restaurant.name}</td><td>${restaurant.city}</td><td>${restaurant.company}</td></tr>`
    );
  }
});
