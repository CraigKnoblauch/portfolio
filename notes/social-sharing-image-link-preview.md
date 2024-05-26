# Including in my project.
Put this in your index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ... other head elements -->

    <!-- Open Graph meta tags -->
    <meta property="og:title" content="Title of your app" />
    <meta property="og:description" content="A short description of your app" />
    <meta property="og:image" content="URL to a thumbnail image" />
    <meta property="og:url" content="URL of your app" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

The recommended size for the image is 1200x630

If it's smaller than 630x315, it will be displayed as a small image to the side of the link preview.