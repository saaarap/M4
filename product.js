
async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMjg0ZjFmMTc1YzAwMTRjNTU4ZTIiLCJpYXQiOjE2OTI4NjcxODEsImV4cCI6MTY5NDA3Njc4MX0.EyLNersfvquEoHaYNDEZPXb-vxTdWizQ6wzg_211hfE'
            }
        });

        if (response.ok) {
            const product = await response.json();
            displayProductDetails(product);
            populateEditForm(product);
        } else {
            console.error('Errore nel recupero dei dettagli del prodotto:', response.status);
        }
    } catch (error) {
        console.error('Errore nella richiesta:', error);
    }
}

function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details');
    const productHtml = `
        <div>
            <h2>${product.name}</h2>
            <p>Brand: ${product.brand}</p>
            <p>Prezzo: ${product.price}</p>
            <p>Descrizione: ${product.description}</p>
            <img src="${product.imageUrl}" alt="${product.name}">
        </div>
    `;
    productDetailsContainer.innerHTML = productHtml;
}

function goBack() {
    window.location.href = 'index.html';
}

async function fetchProductForEdit(productId) {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMjg0ZjFmMTc1YzAwMTRjNTU4ZTIiLCJpYXQiOjE2OTI4NjcxODEsImV4cCI6MTY5NDA3Njc4MX0.EyLNersfvquEoHaYNDEZPXb-vxTdWizQ6wzg_211hfE'
            }
        });

        if (response.ok) {
            const product = await response.json();
            populateEditForm(product);
        } else {
            console.error('Errore nel recupero dei dettagli del prodotto:', response.status);
        }
    } catch (error) {
        console.error('Errore nella richiesta:', error);
    }
}

function populateEditForm(product) {
    const productId = urlParams.get('id');
    const editNameInput = document.getElementById('name');
    const editBrandInput = document.getElementById('brand');
    const editPriceInput = document.getElementById('price');
    const editDescriptionInput = document.getElementById('description');
    const editImageUrlInput = document.getElementById('imageUrl');  



    editNameInput.value = product.name;
    editDescriptionInput.value = product.description;
    editBrandInput.value = product.brand;
    editPriceInput.value = product.price;
    editImageUrlInput.value = product.imageUrl;

    const editForm = document.getElementById('edit-form');
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const editedProduct = {
            name: editNameInput.value,
            description: editDescriptionInput.value,
            brand: editBrandInput.value,
            imageUrl: editImageUrlInput.value,
            price: parseFloat(editPriceInput.value)
        };

        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
                method: 'PUT',
                body: JSON.stringify(editedProduct),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMjg0ZjFmMTc1YzAwMTRjNTU4ZTIiLCJpYXQiOjE2OTI4NjcxODEsImV4cCI6MTY5NDA3Njc4MX0.EyLNersfvquEoHaYNDEZPXb-vxTdWizQ6wzg_211hfE'
                }
            });

            if (response.ok) {
                console.log('Prodotto modificato con successo');
                window.location.href = 'index.html';
                fetchProducts(); 
            } else {
                console.error('Errore:', response.status);
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    });
}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
    fetchProductDetails(productId);
} else {
    console.error('Id del prodotto non presente nella query string');
}


