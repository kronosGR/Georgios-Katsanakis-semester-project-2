import * as Utils from './utils.js';
import Product from './components/product.js';

Utils.updateLoginBtn('#login');
const id = Utils.getQueryString('id') || 0;

if (id === 0) window.location = 'index.html';
Product(id);
