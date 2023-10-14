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
    const tr = document.createElement('tr');
    tr.insertAdjacentHTML(
      'beforeend',
      `<td>${restaurant.name}</td><td>${restaurant.city}</td><td>${restaurant.company}</td>`
    );
    restaurantTable.appendChild(tr);
    tr.addEventListener('click', async () => {
      const menuItems: Menu = await fetchData(
        apiUrl + `restaurants/daily/${restaurant._id}/fi`
      );
      menuItems.courses?.forEach((course) =>
        updateMenu(course as unknown as Course)
      );
      console.log(menuItems);
    });
  }
});

const updateMenu = (course: Course) => {
  const menuTable = document.getElementById('menu_table');
  const element = document.createElement('tr');
  element.insertAdjacentHTML(
    'beforeend',
    `<td>${course.name}</td><td>${course.price}</td><td>${course.diets}</td>`
  );
  menuTable?.appendChild(element);
  const menuElement = document.getElementById('menu');
  if (menuElement) {
    menuElement.style.display = 'block';
  }
};
