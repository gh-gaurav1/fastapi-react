import axios from 'axios'

const api = axios.create({
    baseURL:'https://fastapi-react-fq39.onrender.com/docs#/',
});

export default api;