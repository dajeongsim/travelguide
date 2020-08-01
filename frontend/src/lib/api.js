import axios from 'axios';
import queryString from 'query-string';

export const getCityList = (category) => axios.get(`/api/post/cities/${category}`);
export const getTagList = () => axios.get('/api/post/tags');
export const getPostList = ({category, sltCities, page}) => axios.get(`/api/post/?${queryString.stringify({category, sltCities, page})}`);
export const writePost = ({title, address, coords, contents, tags, category, userId}) => axios.post('/api/post', {title, address, coords, contents, tags, category, userId});
export const getPost = ({postId, userId}) => axios.get(`/api/post/${postId}/${userId}`);
export const toggleLike = ({targetId, type, userId, writerId, likes}) => axios.post('/api/post/like', {targetId, type, userId, writerId, likes});
export const onBlame = ({targetId, type, userId, writerId}) => axios.post('/api/post/blame', {targetId, type, userId, writerId});

export const login = ({id, password}) => axios.post('/api/auth/login', {id, password});
export const nLogin = ({code, state}) => axios.get(`/api/auth/nLogin/?${queryString.stringify({code, state})}`);
export const logout = () => axios.post('/api/auth/logout');
export const checkLogin = () => axios.get('/api/auth/checkLogin');

export const register = ({id, password, name, email}) => axios.post('/api/user/register', {id, password, name, email});
export const checkIdExists = (id) => axios.get(`/api/user/check/id/${id}`);
export const checkEmailExists = (email) => axios.get(`/api/user/check/email/${email}`);
