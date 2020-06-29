import axios from 'axios';
import queryString from 'query-string';

export const getCityList = (category) => axios.get(`/api/post/cities/${category}`);
export const getTagList = () => axios.get('/api/post/tags');
export const getPostList = ({category, sltCities, page}) => axios.get(`/api/post/?${queryString.stringify({category, sltCities, page})}`);
export const writePost = ({title, address, coords, contents, tags, category, userId}) => axios.post('/api/post', {title, address, coords, contents, tags, category, userId});
export const getPost = ({postId, userId}) => axios.get(`/api/post/${postId}/${userId}`);
export const toggleLike = ({targetId, type, userId, writerId, likes}) => axios.post('/api/post/like', {targetId, type, userId, writerId, likes});
export const onBlame = ({targetId, type, userId, writerId}) => axios.post('/api/post/blame', {targetId, type, userId, writerId});
