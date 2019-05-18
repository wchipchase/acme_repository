import axios from 'axios';

const getCategories = () => axios.get('../db/categories.json');

export default { getCategories };
