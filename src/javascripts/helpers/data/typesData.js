import axios from 'axios';

const getTypesForCategories = categories => new Promise((resolve, reject) => {
  axios.get('../db/types.json')
    .then((response) => {
      const { types } = response.data;
      const categoriesWithTypes = categories.map((category) => {
        const builtCategory = category;
        const matchingTypes = types.filter(type => type.category === category.id);
        builtCategory.types = matchingTypes;
        return builtCategory;
      });
      resolve(categoriesWithTypes);
    })
    .catch(error => reject(error));
});

export default { getTypesForCategories };
