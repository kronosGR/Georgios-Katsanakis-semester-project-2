# Semester Project 2 - PetParadise

It is an online store that uses strapi hosted on heroku as backend

## More:
* HTML/CSS/JS
* Bootstrap
* SASS
* JS components
* Strapi hosted on heroku and configured to save the images to cloudinary


## Notes
### Strapi configuration for heroku and cloudinary

```
# install strapi-provider-upload-cloudinary
npm i strapi-provider-upload-cloudinary

# create a config file at ./config/plugins.js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'cloudinary',
    providerOptions: {
      cloud_name: env('CLOUDINARY_NAME'),
      api_key: env('CLOUDINARY_KEY'),
      api_secret: env('CLOUDINARY_SECRET'),
    },
    actionOptions: {
      upload: {},
      delete: {},
    },
  },
  // ...
});

# set variables to heroku
heroku config:set CLOUDINARY_NAME=cloud_name
heroku config:set CLOUDINARY_KEY=api_key
heroku config:set CLOUDINARY_SECRET=api_secret
```