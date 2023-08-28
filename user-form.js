function goBack() {
  window.location.href = 'index.html'; 
}

const API_URL = 'https://striveschool-api.herokuapp.com/api/product/';



const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageUrlInput = document.getElementById('imageUrl');
const priceInput = document.getElementById('price');

const form = document.getElementById('user-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

    const newProduct = {
      name: nameInput.value,
      description: descriptionInput.value,
      brand: brandInput.value,
      imageUrl: imageUrlInput.value,
      price: parseFloat(priceInput.value)
    };
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST', 
        body: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMjg0ZjFmMTc1YzAwMTRjNTU4ZTIiLCJpYXQiOjE2OTI4NjcxODEsImV4cCI6MTY5NDA3Njc4MX0.EyLNersfvquEoHaYNDEZPXb-vxTdWizQ6wzg_211hfE'
        }
      });
  
      if (response.ok) {
        console.log(await response.json());
        window.location.href = 'index.html';
      } else {
        console.error('Errore:', response.status);
      }
    } catch (error) {
      console.error('Errore:', error);
    }
  });
  


