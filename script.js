const cardsContainer = document.querySelector('.cards');
const addCardButton = document.querySelector('#addCard');
const modalBg = document.querySelector('#modalBg');
const closeModal = document.querySelector('#closeModal');
const cardDetails = document.querySelector('#cardDetails');
const modalContent = document.querySelector('.modal-content');
const saveButton = document.querySelector('#saveButton');
const closeButton = document.querySelector('.close');
const detailsModalBg = document.querySelector('#detailsModalBg');
const closeDetailsModal = document.querySelector('#closeDetailsModal');

const defaultImageUrl = 'contenido/Support.ico';
addCardButton.addEventListener('click', () => {
    modalBg.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    modalBg.style.display = 'none';
});

closeModal.addEventListener('click', () => {
    modalBg.style.display = 'none';
});

saveButton.addEventListener('click', () => {
    const name = document.querySelector('#nameInput').value;
    const ip = document.querySelector('#ipInput').value;
    const location = document.querySelector('#locationInput').value;
    const selectedImage = document.querySelector('#imageInput').files[0];

    if (name && ip && location  ) {
        // Crea la tarjeta con la imagen
        const card = createCard(name, ip, location, selectedImage);
        cardsContainer.appendChild(card);
        modalBg.style.display = 'none';
    } else {
        alert('Por favor, completa todos los campos y selecciona una imagen.');
    }
});

function createCard(name, ip, location, selectedImage) {
    var color = document.querySelector('#colorInput').value;
    const card = document.createElement('div');
    card.className = 'card';
    card.style.backgroundColor = color;

    // Verificar si se seleccionó una imagen
    const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : defaultImageUrl;

    card.innerHTML = `
        <img src="${imageUrl}" alt="Imagen de la estacion" style="width: 100px; height: 100px;" />
        <h3>${name}</h3>
        <p>Dirección IP: ${ip}</p>
        <p>Ubicación: ${location}</p>
    `;

    card.addEventListener('click', () => {
        showCardDetails(name, ip, location);
    });

    return card;
}

function showCardDetails(name, ip, location) {
    cardDetails.querySelector('h3').textContent = name;
    cardDetails.querySelector('p:nth-of-type(1)').textContent = `Dirección IP: ${ip}`;
    cardDetails.querySelector('p:nth-of-type(2)').textContent = `Ubicación: ${location}`;
    detailsModalBg.style.display = 'block';
}

closeDetailsModal.addEventListener('click', () => {
    detailsModalBg.style.display = 'none';
});
document.addEventListener("DOMContentLoaded", function() {
    // Inicializar el selector de iconos
    const iconInput = document.querySelector('.icon-picker');
    FontAwesomeIconPicker.iconPicker(iconInput, {
        title: 'Selecciona un Icono',
        showSelected: true,
        position: 'bottomRight',
        inputSearch: true,
        inputSearchText: 'Buscar icono...',
        iconsPerPage: 20,
        icons: ['fas fa-desktop', 'fas fa-laptop', 'fas fa-server', /* ...otros iconos... */],
        fullClassFormatter: (val) => val
    });
});
const searchInput = document.querySelector('#searchInput');

// Agregar un evento de entrada para la barra de búsqueda
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    // Recorrer todas las tarjetas y verificar si coinciden con el término de búsqueda
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardName = card.querySelector('h3').textContent.toLowerCase();
        const cardIP = card.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
        
        if (cardName.includes(searchTerm) || cardIP.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});
closeModal.addEventListener('click', () => {
    modalBg.style.display = 'none';
    searchInput.value = ''; // Restablecer el campo de búsqueda
    filterCards('');
});
