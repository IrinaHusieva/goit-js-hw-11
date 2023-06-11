
import axios from 'axios';
const API_KEY = "37182303-6c1ecd301a2c09e566ab94b43";
  
export default class NewsAPIService {
  constructor() {
    this.page = 1;
    this.searchValue = "";
  }
  async getImg(searchQuery) {
    const res = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: 1
      }
      
    })
    this.incrementPage();
       return res;
  }
  setSearchValue(query) {
    this.searchValue = query;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}


 
