import categoriesData from '../../helpers/data/categoriesData';
import productsData from '../../helpers/data/productsData';
import typesData from '../../helpers/data/typesData';
import util from '../../helpers/util';

const printProducts = (arrayToPrint) => {
  let domString = '';
  arrayToPrint.forEach((category) => {
    category.types.forEach((type) => {
      type.products.forEach((product) => {
        domString += `<div class="card col-3" id="${product.id}">`;
        domString += '<div class="card-body">';
        domString += `<h5 class="card-title w-100 text-center">${product.name}</h5>`;
        domString += `<p class="card-text"><span>Product Description:</span> ${product.description}</p>`;
        domString += `<p class="card-text"><span>Category:</span> ${category.name}</p>`;
        domString += `<p class="card-text"><span>Type:</span> ${type.name}</p>`;
        domString += '</div>';
        domString += '</div>';
      });
    });
  });
  util.printToDom('products', domString);
};

const initProductsDisplay = () => new Promise((resolve, reject) => {
  categoriesData.getCategories()
    .then(response => typesData.getTypesForCategories(response.data.categories))
    .then(categoriesWithTypes => productsData.getProductsForTypes(categoriesWithTypes))
    .then((finalBuiltData) => {
      printProducts(finalBuiltData);
    })
    .catch(error => reject(error));
});

export default { initProductsDisplay };
