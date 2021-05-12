//                      Теория - МОДУЛИ (export / import)

import {
  add, substract as deduct, multiply, divide 
  } from './module-1.js';

  // substract as deduct - ПЕРЕИМЕНОВАНИЕ ф-ции substract на deduct

  //  console.log(`Результат вычитания: ${substract(4, 1)}`);  //  - ОШИБКА (ф-ция была ПЕРЕИМЕНОВАНА стр.8)
  console.log(`Результат вычитания: ${deduct(4, 1)}`);  // 3
  // ________________________________________________________________________

  console.log(`Результат сложения: ${add(1, 1)}`); // 2
  console.log(`Результат умножения: ${multiply(2, 2)}`);  // 4
  console.log(`Результат деления: ${divide(15, 3)}`);  // 5

  // ________________________________________________________________________
  // если хотим ИМПОРТИРОВАТЬ АБСОЛЮТНО ВСЕ!!

 //              import * as calc from './module-1.js';

 // Будет импортирован ОБЪЕКТ calc - СВОЙСТВАМИ которого - будут ВСЕ Ф-ЦИИ
 //          Ф-ЦИЮ сложения - add - нужно вызвать из ОБЪЕКТА

 //                 console.log(calc.add(1, 1)) // 2
// _________________________________________________________________________
//       import './App.css';  - Импорт ВСЕГО СОДЕРЖАНИЯ ФАЙЛА (App.css)
 //_________________________________________________________________________
 
 //  ИМПОРТ ДЕФОЛТНОй Ф-ЦИИ (стр.47 - module-1.js';)
  import Graph from './module-1.js';

  console.log(typeof Graph); // function (класс - это ф-ция)  

  const graph = new Graph(); // cоздаем новый ОБЪЕКТ-ЭКЗЕМПЛЯР Класса
  graph.addParcel();  // вызываем метод из ОБЪЕКТА

// Можно ПЕРЕИМЕНОВЫВАТЬ 
//                      import G1 from './module-1.js';

//                      console.log(typeof G1); 
// _________________________________________________________________________
// Можно МИКСОВАТЬ - импортировать ДЕФОЛТНЫЕ (с переименованием) и Обычные данные :            import G, {PI} from './module-1.js';

// Можно МИКСОВАТЬ - импортировать ДЕФОЛТНЫЕ (с переименованием) и ВСЕ ДАННЫЕ - как ОБЪЕКТ:        import G, * as calc from './module-1.js';
// _________________________________________________________________________

//     Если в ПРОЕКТ - ВСТРОЕНА БИБЛИОТЕКА (axios, one-liner-joke) - 
//                как Зависимость (dependencies) из npm

//                 import joker from 'one-liner-joke';

// joker - это какой-то модуль в БИБЛИОТЕКЕ one-liner-joke
// __________________________________________________________________________
//               Если необходимо ПОДНЯТЬ ВСЮ БИБЛИОТЕКУ                 (которая скачана из npm - как ЗАВИСИМОСТЬ )

//                   import axios from 'axios';
// __________________________________________________________________________

// Встроенный в JS - МЕТОД fetch (then и catch) для ЗАПРОСОВ по API (URL)       к САЙТУ - Звездные войны
var url = 'https://swapi.dev/api/people/';
    fetch(url)
          .then(
            function(response) {
              response.json()
              .then(function(data) {  // ВЕСЬ ОБЪЕКТ- С данными ПРО ВСЕХ ПЕРСОНАЖЕЙ;
                      console.log(data); 
                      });
            })
            .catch(function(err) {
            console.error('Fetch Error :-S', err);
          });

// То же самое ES6_____________________________________________
var url = 'https://swapi.dev/api/people/';
fetch(url)
      .then((response) => {
          response.json()
          .then((data)=> { 
                     console.log(data); 
                  });
        }
      )
      .catch((error) => {
        console.log(error.message);
      });

// ОДИНАКОВАЯ ЗАПИСЬ стр.78-85 (БЕЗ ФИГУРНЫХ СКОБОК)__________________
var url = 'https://swapi.dev/api/people/';
fetch(url).then((response) => {
             response.json().then(data => console.log(data));
        }).catch(error => console.log(error.message));

// __________________________________________________________________
//                             ПРОЕКТ - marvel
// __________________________________________________________________
// Чтобы в axios выполнялись АССИНХРОННЫЕ Ф-ЦИИ (async)
import 'regenerator-runtime/runtime'

// ПОДНИМАЕМ ВСЮ БИБЛИОТЕКУ AXIOS - (которая скачана из npm - как ЗАВИСИМОСТЬ )
import axios from 'axios'

var url = 'https://gist.githubusercontent.com/Sergii-Pedko/b432b5d4f898d4748645234a2fb804bb/raw/090f84eeb1bec5e6a75e980ff2bbc1f5ad482cbf/catalog.json'; 

//         ЗАПРОС  axios.get(url) АНАЛОГИЧНО -  fetch(url) 

axios.get(url)
.then(data => console.log(data))
.catch(error => console.log(error.message));

// {data: Array(10), status: 200, statusText: "", headers: {…}, config: {…}, …}
//config: {url: "https://...., method: "get", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
// data: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
//.......

// Возвращается ОБЪЕКТ - в котором есть МАССИВ ОБЪЕКТОВ - data: (10) -стр.113
// Чтобы его вернуть - ПЕРЕПИШЕМ ЗАПРОС
axios.get(url)
.then(result => console.log(result.data))
.catch(error => console.log(error.message));

// ВАЖНО!!! такой код (стр.119-120) работает только в axios -                  в fetch -> НЕОБХОДИМ  response.json() - т.е. код стр.90 - 92
// _____________________________________________________________________________
//                         ПЕРЕХОДИМ К MARVEL API

//  Зпаходим на https://developer.marvel.com/ -> Interactive Documentation -> В самом низу : [ base url: https://gateway.marvel.com ]

// Ключ для Marvel API
//        const API_KEY = 'a5837db97d72016c81a7a776f4240db9'

//        const API_URL = 'https://gateway.marvel.com/v1/public/'; 
//                                           
//        const URL_COMICS = 'comics'; //все про комиксы
//        const URL_CHARACTERS = 'characters'; //все про персонажи

//       ВСЕ КОНСТАНТЫ ПЕРЕНЕСЕНЫ В api.js 
// _______________________________________________________________________

//         import { 
//           API_KEY, API_URL, URL_COMICS, URL_CHARACTERS
//           } from './constans/api.js'; - ПРЕРЕНЕСЕН В App.js
// ________________________________________________________________________

// API_URL + URL_COMICS =                                                    СКЛЕИВАНИЕ СТРОК = 'https://gateway.marvel.com/v1/public/' + 'comics' =        'https://gateway.marvel.com/v1/public/comics'

axios.get('https://gateway.marvel.com/v1/public/comics', {
  params:{
    apikey: 'a5837db97d72016c81a7a776f4240db9', // apikey: Ключ доступа для API
    // limit: 100  - limit: Кол-во записей в responce
  }
})
.then(result => console.log(result.data.data.results))
.catch(error => console.log(error.message)); // Без ключа выдаст ОШИБКУ:      

//  ВАЖНО - данные ПАРАМЕТРЫ ОТНОСЯТСЯ ТОЛЬКО К ДОКУМЕНТАЦИИ Marvel API!!!
//                       {  params:{
//                           apikey: API_KEY, 
//                           limit: 100 } 
//                       }
// ______________________________________________________________________

// Деаем то же самое - через КЛАСС (и АССИНХРОННУЮ Ф-ЦИЮ - в которй есть конструкция try - catch => АНАЛОНИЧНАЯ .then И .catch)

//     class GetDataApi {
//       async getData(url) { // Чтобы в axios выполнялись АССИНХРОННЫЕ Ф-ЦИИ ->         НЕОБХОДИМ ИМПОРТ стр.98 
//         try {
//             const responce = await axios.get(url, {
//              params:{
//                apikey: API_KEY,
//                limit: 100
//              }
//             });
//               // console.log(responce.data.data.results);
//                 return responce.data.data.results; 

//         } catch (error) {
//           console.log(error.message);  
//           return false;
//         } 
//       }
//     };
// const getDataApi = new GetDataApi; // Создаем ОБЪЕКТ-ЭКЗЕМПЛЯР Класса
// _________________________________________________________________________
//                 class GetDataApi  - ПЕРЕНЕСЕН В getDataApi.js
//         import {
//           getDataApi
//           } from './utils/getDataApi.js'; - ПРЕРЕНЕСЕН В App.js

// getDataApi.getData(url); - Вызываем метод из экземпляра - перенесем в стр.194

// Но мы хотим, чтобы ответ(responce) вызывался сразу, через САМОВЫЗЫВЮЩУЮСЯ Ф-ЦИЮ - более того, он должен вызываться АССИНХРОННО (ИНАЧЕ ВЫДАСТ: Promice:pending)
// _________________________________________________________________________
//          (async () => {
//             const data = await getDataApi.getData(API_URL + URL_COMICS); 
            
//             console.log(data); 
//          })(); -- ПРЕРЕНЕСЕН В App.js
// __________________________________________________________________________
import App from './components/App/App.js'; // ДЕФОЛТНЫЙ ИМПОРТ КЛАССА
 
import Comics from './components/Comics/Comics.js'// ДЕФОЛТНЫЙ ИМПОРТ КЛАССА
 
  (async () => {
         await App.render(); // Вызов метода из экземпляра (Выводим на экран Комиксы )
         Comics.eventListener(); // Вызываем метод из экземпляра  - ВЕШАЕМ ОБРАБОТЧИК СОБЫТИЯ (click) на ВСЕ элементы <li class="comics__item">

})();

// ______________________________________________________________________


