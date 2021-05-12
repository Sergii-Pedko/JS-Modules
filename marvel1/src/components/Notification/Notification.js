import { ROOT_MODAL } from '../../constans/root.js'; 
// берем элемент DOM <div id="modal"></div>

import './Notification.css'; // Импорт ВСЕГО СОДЕРЖАН ФАЙЛА (Notifications.css)

import imgCloseRed from '../Characters/img/close.svg' // Импорт РИСУНКА в формате svg - НАЗВАНИЕ imgCloseRed - ПРИДУМЫВАЕМ САМИ

class Notification {
  render (){
    console.log('массив ПУСТОЙ!!!');

    // ДЛЯ ВЫВОДА НА Экран :
    const htmlWrapper = `<div class="notification__container">
                             <span>НЕТ Информации о Персонажах</span>

                             <button class="notification__close"
                                onclick="modal.innerHTML = ''"
                                style="background-image: url(${imgCloseRed})">
                             </button>
                        </div>`;

    // в стр. 19 - по клику мы ДЕЛАЕМ ПУСТЫМ СОДЕРЖИМОЕ                      <div id="modal"></div>                                                     В JS - ОБРАТИТЬСЯ к  <div id="modal"> =>                                можно НАПРЯМУЮ через ЕГО id => modal !!! не прописывая конструкцию:        var detModal = document.querySelector('#modal');
    
    // Выводим <div> на Сайт (экран);
    ROOT_MODAL.innerHTML = htmlWrapper;
  };
};

export default new Notification();