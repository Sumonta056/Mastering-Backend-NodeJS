const express = require("express");

const app = express();

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "camera",
      price: 20000,
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
    },
    {
      id: 2,
      name: "table glass",
      price: 3000,
      image: "https://m.media-amazon.com/images/I/81X4SfkV9JL._AC_SL1500_.jpg",
    },
  ];

  if (req.query.search) {
    // reading all products information and storing in filterProducts
    const filterProducts = products.filter((product) =>
      product.name.includes(req.query.search)
    );
    // Sending all products information
    res.send(filterProducts);
    return; // stop processing
  }
  // sending data to client after 3s
  setTimeout(() => {
    res.send(products);
  }, 3000);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
