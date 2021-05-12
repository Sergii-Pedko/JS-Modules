import {ROOT_INDEX} from '../../constans/root.js';


import './Error.css'; // Импорт ВСЕГО СОДЕРЖАНИЯ ФАЙЛА (Error.css)

//* CSS сам по себе глобальный. А Parcell настроен ВСЕ подключать                        (в т.ч. CSS) -> в index.html*/
// ___________________________________________________________

class Error {
  render() {

    const htmlWrapper =  `<div class="error__container">                    
                            <span>
                              <p class="error__alert">Произошла Ошибка</p>
                              <p class="error__alert">Попробуйте зайти позже</p> 
                              
                              <p class="error__img"></p> 
                            </span>  
                          </div>`;

    ROOT_INDEX.innerHTML = htmlWrapper;                       
  };
};

export default new Error(); // Экспортируем ДЕФОЛТНО (единоразово) - ОБЪЕКТ-ЭКЗЕМПЛЯР Класса (в Сommics.js)