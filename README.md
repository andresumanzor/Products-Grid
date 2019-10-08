Products Grid
====

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage displays a list of products for people to browse.

Features
----

- Products are displayed in a grid.
- Users can sort by "size", "price" or "id" in ascending order. The products list reloads when a new sorting option is chosen.
- Each product has :
  - A "size" field, which is the font-size (in pixels). Faces are displayed in their correct size, to give customers a realistic impression of what they're buying.
  - A "price" field, in cents. Formatted as dollars like `$3.51`.
  - A "date" field, which is the date the product was added to the catalog. Dates are displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date is displayed.
- The product grid automatically loads items as you scroll.
- An animated "loading..." message is displayed while the user waits for the data to load.
- To improve the user's experience, we always pre-emptively fetch the next batch of results in advance, making use of idle-time.  But they still should not be displayed until the user has scrolled to the bottom of the product grid. If an item isn't still visible then, an empty container is displayed in their place.
- When the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~".

### Ads features

- An advertisement from one of our sponsors is inserted after every 20 products.
- Ads are randomly selected, but a user will never see the same ad twice in a row.
 
### How do I start the app?

Start with `npm start`. The `prestart` script will install the required node modules for this project to run properly and the main `start` script will launch your `backend` in `localhost:3000` and your `frontend` in `localhost:8080`. (It is *required* for you to be able to run the server in port 3000 as API references within the application are made to so)

### Any other commands?
`build`: Build in production mode.
`build:dev`: Build in development mode.

### Demo?
[Here](https://drive.google.com/file/d/1CVRDx3Uieb1-8uH_o78hcz4ac60s1gUb/view?usp=sharing)

### Infinite Scrolling?
[Yes, over here](https://github.com/andresumanzor/Products-Grid/tree/infinite-scrolling)

### Core Technologies
React, Redux, Redux-Thunk, HTML, CSS, Bootstrap, Material-UI, Axios, Babel, Webpack and Cool-Ascii-Faces.
