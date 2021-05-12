  import './App.css'; // Импорт ВСЕГО СОДЕРЖАНИЯ ФАЙЛА (App.css)

  /* CSS сам по себе глобальный. А Parcell настроен ВСЕ подключать                        (в т.ч. CSS) -> в index.html*/
// ___________________________________________________________

import Comics from '../Comics/Comics.js'// // ДЕФОЛТНЫЙ ИМПОРТ


class App {
  async render(){
    await Comics.render();  // Вызываем метод из экземпляра     
  };
};

export default new App(); // Экспортируем ДЕФОЛТНО (единоразово) - ОБЪЕКТ-ЭКЗЕМПЛЯР Класса

