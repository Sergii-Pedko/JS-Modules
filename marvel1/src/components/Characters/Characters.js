import { IMG_STANDARD_XLARGE } from '../../constans/api.js';

import { getDataApi } from '../../utils/getDataApi.js';

import { ROOT_MODAL } from '../../constans/root.js'; 
// берем элемент DOM <div id="modal"></div>

import './Characters.css'; // Импорт ВСЕГО СОДЕРЖАНИЯ ФАЙЛА (Characters.css)

import imgCloseWhite from './img/close-white.svg' // Импорт РИСУНКА в формате svg - НАЗВАНИЕ imgCloseWhite - ПРИДУМЫВАЕМ САМИ

import Notification from '../Notification/Notification.js' // ДЕФОЛТНЫЙ ИМПОРТ КЛАССА
 

// _____________________________________________________________

class Characters {

  async render (personage_Uri){ // Аналогисно Comics.js стр.24-28

    // как и вовсех ф-циях - во время НАПИСАНИЯ ф-ции - в аргументы ф-ции  (personage_Uri) - можно прописать ЛЮБОЕ НАЗВАНИЕ - главное ПРИ ВЫЗОВЕ Ф-ЦИИ  - ПЕРЕДАТЬ НУЖНЫЙ АРГУМЕНТ ( Comics.js стр.138 - Characters.render(getDataUri);)

    const data = await getDataApi.getData(personage_Uri); // ВЕРНЕТ ответ с сервера -  МАССИВ-ОБЪЕКТОВ Персонаженй по данному комику(по которому был клик)

    // console.log(personage_Uri); // Проверочка - аналогично Comics.js стр.136

    // console.log(data); // ПРОВЕРОЧКА

    if (data.length > 0) { // Если длинна массива > 0 - Значит он НЕ ПУСТОЙ

      // в МЕТОДЕ renderContent - нам необходимо работать с ПЕРЕМЕННОЙ data, но ОНА БЫЛА ОПРЕДЕЛЕНА В МЕТОДЕ render-стр. 23 - ЧТОБЫ ПЕРЕДАТЬ ЕЕ В МЕТОД renderContent - ПРОПИШЕМ ЕЕ В АРГУМЕНТ Ф-ЦИИ при ЗАПИСИ метода (стр.45) и при ВЫЗОВЕ метода (стр.33)

      this.renderContent(data) 
      //   this - прописываем, протому-что данный метод описан ниже -  внутри этого-же КЛАССА (class Characters)
    } else {

      //   this.renderNotification() - стр. 95 (ЗАМЕНЕН ВНЕШИМ МЕТОДОМ - render() из класса Notification (Notifications.js))

      Notification.render();

    }; // стр.29-41 можно записать в виде ТЕРНАРНОГО ОПЕРАТОРА:                            data.length ? this.renderContent(data) : this.renderNotification(); 
  };
  // __________________________________________________________________________

  renderContent(data){ // Будет отображать список персонажей (массив НЕ ПУСТОЙ)
    console.log('массив НЕ ПУСТОЙ - выводим данные');

    // Аналогисно Comics.js стр.52-101
    let htmlContent = '';

    console.log(data); // ДЛЯ ПРОВЕРКИ - Выдаст МАССИВ-ОБЪЕКТОВ

     data.forEach(({ name, thumbnail:{ path, extension } }) => {
        //console.log( name, path, extension); // ДЛЯ ПРОВЕРКИ

        const imgSrc = path + '/' + IMG_STANDARD_XLARGE + '.' + extension;

        console.log(imgSrc); // ДЛЯ ПРОВЕРКИ наприм. - http://i.annihil.us/u/prod/marvel/i/mg/c/90/535febe8b095a/standard_xlarge.jpg

        // ДЛЯ ВЫВОДА НА Экран - как Список <li> (внутри <ul>)_________ :

        //Выведем ОДИН ЗА ДРУГИМ <li> - которые вмещают в себя отдельные с-ва ОБЪЕКТА - который является ЭЛЕМЕНТОМ полученного по запросу МАССИВА 

     htmlContent = htmlContent + ` <li class="characters__item">
                                     <img class="img-cover characters__img" src="${imgSrc}">
                                     <span class="characters__name">${name}</span>
                                   </li>`;
    });

    // Создадим внешнюю оболочку <ul> - которой передадим внутренние <li>
    // Чтобы сделать МОДАЛЬНОЕ ОКНО: <ul> НЕОБХОДИМО ОБЕРНУТЬ В <div>

        const htmlWrapper = `<div class="characters-wrapper">
                                <ul class="characters__container">
                                    ${htmlContent}
                                </ul>

                                <button class="characters__close btn bg-contain"
                                  onclick="modal.innerHTML = ''"
                                  style="background-image: url(${imgCloseWhite})">
                                </button>
                            </div>`;

    // в стр. 78 - по клику мы ДЕЛАЕМ ПУСТЫМ СОДЕРЖИМОЕ <div id="modal"></div>             В JS - обратиться к  <div id="modal"> - можно напрямую через ЕГО id => modal !!! не прописывая конструкцию:                                                              var detModal = document.querySelector('#modal');

        // Выводим <ul> на Сайт (экран);
          ROOT_MODAL.innerHTML = htmlWrapper;
  };
// ______________________________________________________________________________

// Внутренний Метод для проверки правельности работы стр. 37 -  Будет показывать УВЕДОМЛЕНИЕ если ПЕРСОНАЖИ ОТСУТСТВУЮТ (пустой массив)

// ЗАМЕНЕН ВНЕШИМ МЕТОДОМ - render() из класса Notification (Notifications.js) -стр.39

//                             renderNotification(){  
//                               console.log('массив ПУСТОЙ!!!');
//                             };
};

export default new Characters(); // Экспортируем ДЕФОЛТНО (единоразово) - ОБЪЕКТ-ЭКЗЕМПЛЯР Класса (в Comics.js стр.138)