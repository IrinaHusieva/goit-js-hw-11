import axios from 'axios';
const API_KEY = "37182303-6c1ecd301a2c09e566ab94b43";
export { getImg };
  
  
async function getImg(searchQuery) {
  const res = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40
    }
    
  })
     return res;
}