
const API_URL = 'https://striveschool-api.herokuapp.com/api/product/';

async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMjg0ZjFmMTc1YzAwMTRjNTU4ZTIiLCJpYXQiOjE2OTI4NjcxODEsImV4cCI6MTY5NDA3Njc4MX0.EyLNersfvquEoHaYNDEZPXb-vxTdWizQ6wzg_211hfE'
      }
    });

    if (response.ok) {
      const data = await response.json();
      displayProducts(data);
    } else {
      console.error('Errore nel recupero dei prodotti:', response.status);
    }
  } catch (error) {
    console.error('Errore nella richiesta:', error);
  }
}

function displayProducts(data) {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  data.forEach(product => {
    const row = `
      <div class="d-flex m-3">
        <div class="flex">
          <img src="${product.imageUrl}" alt="...">
        </div>
        <div class="flex-grow-1 ms-3">
          <h3>${product.name}</h3>
          <p>${product.brand}</p>
          <p>${product.description}</p>
          <p>${product.price}</p>
        </div>
      </div>
      <button type="button" class="btn btn-danger m-3" onclick="deleteProduct('${product._id}')">Cancella</button>
<a href="product.html?id=${product._id}" class="btn btn-primary">Dettagli</a>
    `;

    cardContainer.innerHTML += row;
  });
}


async function deleteProduct(productId) {
  if (confirm('Sei sicuro di voler eliminare il prodotto?')) {
    try {
      const response = await fetch(`${API_URL}${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMjg0ZjFmMTc1YzAwMTRjNTU4ZTIiLCJpYXQiOjE2OTI4NjcxODEsImV4cCI6MTY5NDA3Njc4MX0.EyLNersfvquEoHaYNDEZPXb-vxTdWizQ6wzg_211hfE',
        },
      });

      if (response.ok) {
        console.log('Prodotto eliminato con successo');
        fetchProducts(); // Reload products after deletion
      } else {
        console.error('Errore durante l\'eliminazione del prodotto:', response.status);
      }
    } catch (error) {
      console.error('Errore:', error);
    }
  }
}
function addProduct() {
  window.location.href = 'user-form.html';
  console.log('Add Product button clicked');
}

fetchProducts();