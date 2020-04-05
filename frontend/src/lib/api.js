import axios from 'axios';
import queryString from 'query-string';

export const getCityList = (category) => axios.get(`/api/post/cities/${category}`);
export const getTagList = () => axios.get('/api/post/tags');
export const getPostList = ({category, sltCities, page}) => axios.get(`/api/post/?${queryString.stringify({category, sltCities, page})}`);
export const writePost = ({title, address, contents, tags, category, userId}) => axios.post('/api/post', {title, address, contents, tags, category, userId});
