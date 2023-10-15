import './style.css';
import {apiUrl, menuScope} from './variables';

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
      if (menuScope === 'day') {
        const menuItems: Menu = await fetchData(
          apiUrl + `restaurants/daily/${restaurant._id}/fi`
        );
        menuItems.courses?.forEach((course) =>
          updateMenu(course as unknown as Course)
        );
        console.log(menuItems);
      } else if (menuScope === 'week') {
        const days: Record<string, unknown> = await fetchData(
          apiUrl + `restaurants/weekly/${restaurant._id}/fi`
        );
        const daysArray = Object.entries(days);
        console.log(daysArray);
        daysArray.forEach((day) => {
          const coursesArray = Object.entries(
            day[1] as Record<string, unknown>
          );
          console.log(coursesArray);
          coursesArray.forEach((course) => {
            const coursesObject = course[1] as Record<string, unknown>;
            const date = coursesObject.date as string;
            const menuTable = document.getElementById('menu-table');
            const element = document.createElement('tr');
            element.insertAdjacentHTML(
              'beforeend',
              `<td colspan="3" class="table-date">${date}</td>`
            );
            menuTable?.appendChild(element);
            console.log(date);
            const courses = coursesObject.courses as Course[];
            courses.forEach((course) => updateMenu(course));
          });
        });
      }
    });
  }
});

const updateMenu = (course: Course) => {
  const menuTable = document.getElementById('menu-table');
  const element = document.createElement('tr');
  element.classList.add('menu-row');
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
