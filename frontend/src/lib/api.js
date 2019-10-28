import axios from 'axios';
import queryString from 'query-string';

export const getCityList = (category) => axios.get(`/api/post/cities/${category}`);
export const getTagList = () => axios.get('/api/post/tags');
export const getPostList = ({category, sltProv, tags, page}) => axios.get(`/api/post/?${queryString.stringify({category, sltProv, tags, page})}`);
