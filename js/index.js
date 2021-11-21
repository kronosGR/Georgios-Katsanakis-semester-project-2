import * as Strapi from './strapi.js';
import Hero from './components/hero-banner.js';
import Featured from './components/featured.js';
import { updateCartCount, updateLoginBtn } from './utils.js';

// update the item
updateCartCount('#counter');
updateLoginBtn('#login');

// load the hero banner
Hero(Strapi.getHero());

// load the featured products
Featured();
