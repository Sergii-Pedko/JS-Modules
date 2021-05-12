import { 
  API_KEY, API_URL, URL_COMICS, URL_CHARACTERS, IMG_STANDARD_XLARGE, IMG_NOT_AVALIABLE
  } from '../../constans/api.js';

  import { getDataApi } from '../../utils/getDataApi.js';

  import { ROOT_INDEX } from '../../constans/root.js'; 
  // берем элемент DOM <div id="root"></div>

  import Error from '../Error/Error.js'// ДЕФОЛТНЫЙ ИМПОРТ

  import Characters from '../Characters/Characters.js'// ДЕФОЛТНЫЙ ИМПОРТ

// ___________________________________________________________
  import './Marvel_Comics.css'; // Импорт ВСЕГО СОДЕРЖАНИЯ ФАЙЛА (Marvel_Comics.css)

//* CSS сам по себе глобальный. А Parcell настроен ВСЕ подключать              (в т.ч. CSS) -> в index.html*/
// ___________________________________________________________

class Comics {

  async render(){ 

    //  в const data - передаем выполнение Метода getData(url) из ОБЪЕКТА getDataApi, коорый является -ЭКЗЕМПЛЯРОМ Класса GetDataApi - который возвращает ОТВЕТ на запрос к серверу  (return responce.data.data.results; getDataApi.js - стр.20 )
    
    const data = await getDataApi.getData(API_URL + URL_COMICS); 
      // id- элемента
      // title - название комикса
      // ОБЪЕКТ thumbnail: {path: "http://.....", extension: "jpg"} - путь к картинке
      // Все это мы передадим в forEach - стр.54____________________________
  
      // т.к. ответ с сервера (data) - это МАССИВ применям метод forEach       (Наработки.html стр. стр.224, 232)
  
      if (data) { // аналогично data === true

         this.renderComics(data);// Если все Хороше и получен ОТВЕТ (в виде массива data) - Выполняется МЕТОД renderComics(data) - описанный ниже (стр.45).           
//        this - прописываем, протому-что данный метод описан внутри этого-же КЛАССА (class Comics)
      } else {
        Error.render(); // Иначе (если ответ с сервера не приходит)- Выполняется МЕТОД Error.render() - из ф-ла Error.js  
      };
      // стр.34-40 можно записать в виде ТЕРНАРНОГО ОПЕРАТОРА:                 data ? this.renderComics(data) : Error.render();
    };
  // _________ ____________________________________________________________
  
  renderComics(data){
    let htmlContent = '';
    // ____________________________________________________________________
      //       data.forEach((element) => {
      //         console.log(element.id, element.title, element.thumbnail);
      //       });
// _______________Проведем Деструктуризацию (стр.48)__________________
  data.forEach(({ id, title, thumbnail:{ path, extension } }) => {

  // console.log(id, title, path, extension); - ДЛЯ ПРОВЕРКИ

//82967"Marvel Previews (2017)" "http://i.annihil.....image_not_available" "jpg"
// _____________________________________________________________________________

// ЗАДАЧА - НЕ ОТОБРАЖАТЬ КОМИКСЫ В КОТОРЫХ НЕТ КАРТИНКИ - т.е URL которых в конце содержит http://i.annihil.us......./image_not_available
// 1) создадим в appi.js - const IMG_NOT_AVALIABLE = 'image_not_available' и импортируем сюда;
// 2) ДЕЛАЕМ ПРОВЕРКУ: (если такой строки НЕТ в URL -стр.63 - то добавлям в <li>)

  if (path.lastIndexOf(IMG_NOT_AVALIABLE) === -1) {      
//       console.log(path);
// ____________________________________________________________________________
// Документ - как вытянуть рис. https://developer.marvel.com/documentation/images

  //const imgSrc = path + '/' + 'standard_xlarge' + extension;

  const imgSrc = path + '/' + IMG_STANDARD_XLARGE + '.' + extension;
// _____________________________________________________________________________

// Нам нужно ПРОПИСАТЬ URL (для каждой <li>)- ЧТОБЫ ПОЛУЧИТЬ ГЕРОЕВ ПО ДАННОМУ КОМИКСУ - https://developer.marvel.com/docs 

// GET /v1/public/comics/{comicId}/characters - стр. 78

// const uri = 'GET /v1/public/comics/{comicId}/characters'
 const uri = API_URL + URL_COMICS + '/' + id + '/' + URL_CHARACTERS;
// передадим uri - как data-АТРИБУТ(для каждой <li>)-в стр. 87                (аналог класса JS-DOM.html-стр. 3231)
// ________________________________________________________________________

// ДЛЯ ВЫВОДА НА Экран - как Список <li> (внутри <ul>)_________ :

//Выведем ОДИН ЗА ДРУГИМ <li> - которые вмещают в себя отдельные с-ва ОБЪЕКТА - который является ЭЛЕМЕНТОМ полученного по запросу МАССИВА  


   htmlContent = htmlContent + ` <li class="comics__item" data-uri="${uri}">
                                   <span class="comics__name">${title}</span>
                                   <img class="comics__img" src="${imgSrc}">
                                 </li>`;
   };                                
  });

// Создадим внешнюю оболочку <ul> - которой передадим внутренние <li>
 const htmlWrapper = `<ul class="comics__container">
                         ${htmlContent}
                      </ul>`

// Выводим <ul> на Сайт (экран);
  ROOT_INDEX.innerHTML = htmlWrapper;
  };
// ___________________________________________________________________________

    eventListener(){ // Нам необходимо ПОВЕСИТЬ ОБРАБОТЧИК СОБЫТИЯ (click) на ВСЕ элементы <li class="comics__item"> (стр.87)

// При МОДУЛЬНОМ подходе - повесить ВЫПОЛНЕНИЕ Ф-ЦИИ вручную НА onclick - НЕВОЗМОЖНО!!!:
// htmlContent= tmlContent +`<li class="comics__item" onclick="eventListener()">
//                                .....
//                           </li>`;
//  ПОЭТОМУ:
//___________________________МЕТОД .addEventListener___________________________
//      function handler () {
//        alert('Спасибо!');
//      };
    
//      var elem = document.getElementById('elem');
    
//      elem.addEventListener("click", handler); // Спасибо!
//_______________________________________________________________________________

   // 1) Находим ВСЕ <li class="comics__item">
    
      document.querySelectorAll('.comics__item').forEach(element => {
//                                          2) ПЕРЕБИРАЕМ ВСЕ <li> - 
//                                      и навешиваем  ОБРАБОТЧИК СОБЫТИЯ (click)
        console.log(element); // Для ПРОВЕРКИ - что перебираются - действительно <li> 
// _______________________________________________________________________________

// Нам нужно ВЫВЕСТИ URL [который уже хранится в атрибуте data-uri - стр.87  (по клику на любую <li>) - НА который нужно отправить запрос - ЧТОБЫ ПОЛУЧИТЬ ГЕРОЕВ ПО ДАННОМУ КОМИКСУ 

      const getDataUri = element.getAttribute('data-uri'); // getAttribute -ЧТЕНИЕ атрибута -стр.87 (в данном случае getDataUri - это URL адресс ГЕРОЕВ ПО ДАННОМУ КОМИКСУ ( <li class="comics__item" data-uri="https://gateway.marvel.com/v1/public/comics/82970/characters"> )
     
        element.addEventListener('click', () => {
            //console.log('Проверочка');

            // console.log(getDataUri); // ПРОВЕРОЧКА - по клику на любой элемент <li> - будет выдавать URL адресс ГЕРОЕВ ПО ДАННОМУ КОМИКСУ = напр. ПЕРВЫЙ КОМИКС: https://gateway.marvel.com/v1/public/comics/82970/characters

            Characters.render(getDataUri); //По клику на любой элемент <li> - будет выполнятся метод render из ОБЪЕКТА-ЭКЗЕМПЛЯРА Класса Characters ( Characters.js). Параметром меода (getDataUri)- является URL адресс ГЕРОЕВ ПО ДАННОМУ КОМИКСУ
        });
      });
    }; // Чтобы этот метод сработал Его необходимо вызвать в index.js - стр.201, 205
  };

  
export default new Comics(); // Экспортируем ДЕФОЛТНО (единоразово) - ОБЪЕКТ-ЭКЗЕМПЛЯР Класса