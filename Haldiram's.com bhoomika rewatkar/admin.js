//CRUD


// Add Product
let addform = document.getElementById("addform");
addform.addEventListener("submit", addData);

function addData(event) {
  event.preventDefault();

  let prodname = document.getElementById("prodname").value;
  let prodprice = document.getElementById("prodprice").value;
  let prodimage = document.getElementById("prodimg").value;
  let prodcategory = document.getElementById("prodcat").value;

  let obj = {
    productName: prodname,
    productPrice: prodprice,
    productCategory: prodcategory,
    productImage: prodimage,
  };

  sendDataToDb(obj);
}

async function sendDataToDb(obj) {
  await fetch("http://localhost:3000/products", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Fetch Products
async function getData() {
  let data = await fetch("http://localhost:3000/products");
  let actualData = await data.json();
  console.log(actualData);
}

// Delete Product
async function deldata() {
  let inpval = document.getElementById("delid").value;

  await fetch(`http://localhost:3000/products/${inpval}`, {
    method: "DELETE",
  });
}

// Update Product
let updateBtn = document.getElementById("getDataBtn");
updateBtn.addEventListener("click", getDataMapToForm);

let prodid;

async function getDataMapToForm() {
  prodid = document.getElementById("updateInp").value;

  let data = await fetch(`http://localhost:3000/products/${prodid}`);
  let actualData = await data.json();

  document.getElementById("updatename").value = actualData.productName;
  document.getElementById("updateprice").value = actualData.productPrice;
  document.getElementById("updatecat").value = actualData.productCategory;
  document.getElementById("updateimg").value = actualData.productImage;
}

let updateform = document.getElementById("updateform");
updateform.addEventListener("submit", updateData);

async function updateData(event) {
  event.preventDefault();

  let prodname = document.getElementById("updatename").value;
  let prodprice = document.getElementById("updateprice").value;
  let prodimage = document.getElementById("updateimg").value;
  let prodcategory = document.getElementById("updatecat").value;

  let obj = {
    productName: prodname,
    productPrice: prodprice,
    productCategory: prodcategory,
    productImage: prodimage,
  };

  await fetch(`http://localhost:3000/products/${prodid}`, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Partial Update (Patch)
async function patchUpdate() {
  let upDateInp = document.getElementById("upinp").value;
  let selectPatch = document.getElementById("selectPatch").value;
  let latestVal = document.getElementById("latestVal").value;

  await fetch(`http://localhost:3000/products/${upDateInp}`, {
    method: "PATCH",
    body: JSON.stringify({ [selectPatch]: latestVal }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}



// ==================================================================================================

// cart 

// Function to add data to the database
async function sendDataToDb(obj) {
    await fetch("http://localhost:3000/products", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getData(); // Refresh cart
  }
  
  // Function to fetch and display data in the cart
  async function getData() {
    let data = await fetch("http://localhost:3000/products");
    let products = await data.json();
  
    let cartContainer = document.getElementById("productCart");
    cartContainer.innerHTML = ""; // Clear previous data
  
    products.forEach((product) => {
      let productCard = document.createElement("div");
      productCard.className = "product-card";
  
      productCard.innerHTML = `
        <img src="${product.productImage}" alt="${product.productName}" class="product-image">
        <div class="product-info">
          <h3>${product.productName}</h3>
          <p>Price: ₹${product.productPrice}</p>
          <p>Category: ${product.productCategory}</p>
          <button onclick="deleteProduct(${product.id})">Delete</button>
          <button onclick="populateUpdateForm(${product.id})">Update</button>
        </div>
      `;
  
      cartContainer.appendChild(productCard);
    });
  }
  
  // Function to delete a product
  async function deleteProduct(id) {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });
    getData(); // Refresh the cart after deletion
  }
  
  // Populate update form with product details
  async function populateUpdateForm(id) {
    let data = await fetch(`http://localhost:3000/products/${id}`);
    let product = await data.json();
  
    document.getElementById("updateInp").value = id;
    document.getElementById("updatename").value = product.productName;
    document.getElementById("updateprice").value = product.productPrice;
    document.getElementById("updatecat").value = product.productCategory;
    document.getElementById("updateimg").value = product.productImage;
  
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the update form
  }
  
  // Function to update a product
  async function updateData() {
    let prodid = document.getElementById("updateInp").value;
    let prodname = document.getElementById("updatename").value;
    let prodprice = document.getElementById("updateprice").value;
    let prodimage = document.getElementById("updateimg").value;
    let prodcategory = document.getElementById("updatecat").value;
  
    let obj = {
      productName: prodname,
      productPrice: prodprice,
      productCategory: prodcategory,
      productImage: prodimage,
    };
  
    await fetch(`http://localhost:3000/products/${prodid}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    getData(); // Refresh cart
  }
  
  // Trigger initial load
  getData();
  