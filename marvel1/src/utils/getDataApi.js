// Чтобы в axios выполнялись АССИНХРОННЫЕ Ф-ЦИИ (async)
import 'regenerator-runtime/runtime'

// ПОДНИМАЕМ ВСЮ БИБЛИОТЕКУ AXIOS - (которая скачана из npm - как ЗАВИСИМОСТЬ )
import axios from 'axios'

import { API_KEY } from '../constans/api.js';


class GetDataApi {
  async getData(url) { // Чтобы в axios выполнялись АССИНХРОННЫЕ Ф-ЦИИ ->           НЕОБХОДИМ ИМПОРТ стр.2
    try {
        const responce = await axios.get(url, {
         params:{
           apikey: API_KEY,
           limit: 100
         }
        });
          // console.log(responce.data.data.results);
            return responce.data.data.results; 

    } catch (error) {
      console.log(error.message);  
      return false;
    } 
  }
};
export const getDataApi = new GetDataApi; // Создаем ОБЪЕКТ-ЭКЗЕМПЛЯР Класса