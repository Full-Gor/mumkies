// Données des produits
const products = [
    {
        id: '1',
        name: 'Cookie Chocolat Noir',
        image: 'https://images.pexels.com/photos/20509471/pexels-photo-20509471.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 3.50,
        category: 'Chocolat',
        recipe: [
            'Farine de blé bio',
            'Chocolat noir 70%',
            'Beurre fermier',
            'Sucre de canne',
            'Œufs frais',
            'Vanille de Madagascar'
        ],
        isNew: true,
        isBestSeller: true
    },
    {
        id: '2',
        name: 'Cookie Pépites de Chocolat',
        image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 3.20,
        category: 'Chocolat',
        recipe: [
            'Farine bio',
            'Pépites de chocolat',
            'Beurre doux',
            'Sucre roux',
            'Œufs bio',
            'Levure naturelle'
        ],
        isBestSeller: true
    },
    {
        id: '3',
        name: 'Cookie Noix de Pécan',
        image: 'https://images.pexels.com/photos/9424236/pexels-photo-9424236.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 4.00,
        category: 'Fruits Secs',
        recipe: [
            'Farine complète',
            'Noix de pécan fraîches',
            'Beurre salé',
            'Miel d\'acacia',
            'Œufs de poules élevées en plein air',
            'Cannelle de Ceylan'
        ],
        isNew: true
    },
    {
        id: '4',
        name: 'Cookie Avoine Raisins',
        image: 'https://images.pexels.com/photos/20558713/pexels-photo-20558713.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 3.80,
        category: 'Santé',
        recipe: [
            'Flocons d\'avoine',
            'Raisins secs',
            'Farine d\'épeautre',
            'Huile de coco',
            'Sirop d\'érable',
            'Graines de tournesol'
        ]
    },
    {
        id: '5',
        name: 'Cookie Double Chocolat',
        image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 3.90,
        category: 'Chocolat',
        recipe: [
            'Chocolat noir 85%',
            'Chocolat au lait',
            'Farine de blé',
            'Beurre extra fin',
            'Cassonade',
            'Cacao en poudre'
        ],
        isBestSeller: true
    },
    {
        id: '6',
        name: 'Cookie Amande Coco',
        image: 'https://images.pexels.com/photos/20509471/pexels-photo-20509471.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 4.20,
        category: 'Fruits Secs',
        recipe: [
            'Poudre d\'amande',
            'Noix de coco râpée',
            'Farine d\'amande',
            'Beurre de coco',
            'Miel de lavande',
            'Extrait d\'amande'
        ],
        isNew: true
    },
    {
        id: '7',
        name: 'Cookie Matcha Chocolat Blanc',
        image: 'https://images.pexels.com/photos/9424236/pexels-photo-9424236.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 4.50,
        category: 'Gourmand',
        recipe: [
            'Thé matcha premium',
            'Chocolat blanc',
            'Farine de riz',
            'Beurre japonais',
            'Sucre glace',
            'Poudre de thé vert'
        ],
        isNew: true
    },
    {
        id: '8',
        name: 'Cookie Beurre de Cacahuète',
        image: 'https://images.pexels.com/photos/20558713/pexels-photo-20558713.jpeg?auto=compress&cs=tinysrgb&w=400',
        price: 3.70,
        category: 'Gourmand',
        recipe: [
            'Beurre de cacahuète crunchy',
            'Cacahuètes grillées',
            'Farine complète',
            'Sucre muscovado',
            'Œufs fermiers',
            'Sel de Guérande'
        ],
        isBestSeller: true
    }
];

// État du panier
let cart = JSON.parse(localStorage.getItem('mumkies-cart') || '[]');

// Fonctions utilitaires
function saveCart() {
    localStorage.setItem('mumkies-cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    const floatingBtn = document.getElementById('floating-cart-btn');
    
    cartCountEl.textContent = count;
    floatingBtn.style.display = count > 0 ? 'flex' : 'none';
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

// Animation des titres lettre par lettre
function animateTitle(element) {
    const text = element.dataset.text;
    if (!text) return;
    
    element.innerHTML = '';
    
    const letters = text.split('').map((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'bounce-letter';
        span.style.animationDelay = `${index * 0.2}s`;
        span.style.display = 'inline-block';
        span.style.minWidth = char === ' ' ? '0.3em' : 'auto';
        return span;
    });
    
    letters.forEach(letter => element.appendChild(letter));
}

function startTitleAnimations() {
    const animatedTitles = document.querySelectorAll('.animated-title');
    
    function animateAllTitles() {
        animatedTitles.forEach(title => animateTitle(title));
    }
    
    // Animation initiale
    animateAllTitles();
    
    // Répéter toutes les 10 secondes (5s animation + 5s pause)
    setInterval(animateAllTitles, 10000);
}

// Création des cartes produits
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-card-inner">
            <div class="product-card-front">
                <div class="product-badges">
                    ${product.isNew ? '<span class="badge new">Nouveau</span>' : ''}
                    ${product.isBestSeller ? '<span class="badge bestseller">★ Best</span>' : ''}
                </div>
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">Catégorie: ${product.category}</p>
                    <p class="product-price">${product.price.toFixed(2)} €</p>
                </div>
            </div>
            <div class="product-card-back">
                <div class="product-back-content">
                    <h3 class="product-back-title">${product.name}</h3>
                    <div>
                        <h4 class="ingredients-title">Ingrédients:</h4>
                        <ul class="ingredients-list">
                            ${product.recipe.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="product-back-footer">
                    <div class="product-controls">
                        <span class="product-back-price">${product.price.toFixed(2)} €</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus-btn" data-id="${product.id}">-</button>
                            <span class="quantity-display" data-id="${product.id}">1</span>
                            <button class="quantity-btn plus-btn" data-id="${product.id}">+</button>
                        </div>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Gestion du flip de la carte
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            card.classList.toggle('flipped');
        }
    });
    
    return card;
}

// Gestion des quantités dans les cartes produits
function setupProductQuantities() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('minus-btn')) {
            e.stopPropagation();
            const productId = e.target.dataset.id;
            const quantityEl = document.querySelector(`.quantity-display[data-id="${productId}"]`);
            let quantity = parseInt(quantityEl.textContent);
            if (quantity > 1) {
                quantity--;
                quantityEl.textContent = quantity;
            }
        }
        
        if (e.target.classList.contains('plus-btn')) {
            e.stopPropagation();
            const productId = e.target.dataset.id;
            const quantityEl = document.querySelector(`.quantity-display[data-id="${productId}"]`);
            let quantity = parseInt(quantityEl.textContent);
            quantity++;
            quantityEl.textContent = quantity;
        }
        
        if (e.target.classList.contains('add-to-cart-btn')) {
            e.stopPropagation();
            const productId = e.target.dataset.id;
            const quantityEl = document.querySelector(`.quantity-display[data-id="${productId}"]`);
            const quantity = parseInt(quantityEl.textContent);
            const product = products.find(p => p.id === productId);
            
            addToCart(product, quantity);
            
            // Reset quantity
            quantityEl.textContent = '1';
            
            // Animation feedback
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });
}

// Gestion du panier
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            product: product,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        renderCart();
    }
}

// Rendu du panier
function renderCart() {
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
        cartSummary.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartItems.style.display = 'block';
    cartSummary.style.display = 'block';
    
    // Rendu des items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-content">
                <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.product.name}</h3>
                    <p class="cart-item-category">${item.product.category}</p>
                    <p class="cart-item-price">${item.product.price.toFixed(2)} €</p>
                </div>
                <div class="cart-item-controls">
                    <button class="cart-quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <span class="cart-quantity-display">${item.quantity}</span>
                    <button class="cart-quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="cart-item-subtotal">
                <span>Sous-total</span>
                <span>${(item.product.price * item.quantity).toFixed(2)} €</span>
            </div>
        </div>
    `).join('');
    
    // Rendu du résumé
    const subtotal = calculateTotal();
    const deliveryCost = subtotal >= 25 ? 0 : 5;
    const total = subtotal + deliveryCost;
    
    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} €`;
    document.getElementById('delivery-cost').textContent = deliveryCost === 0 ? 'Gratuite' : `${deliveryCost.toFixed(2)} €`;
    document.getElementById('total').textContent = `${total.toFixed(2)} €`;
}

// Scroll vers le panier
function scrollToCart() {
    document.getElementById('cart-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Fonction pour commander via WhatsApp
function orderViaWhatsApp() {
    if (cart.length === 0) {
        alert('Votre panier est vide ! Ajoutez des produits avant de commander.');
        return;
    }
    
    let message = '🍪 *Commande Mumkies* 🍪\n\n';
    message += 'Bonjour ! Je souhaite passer une commande :\n\n';
    
    cart.forEach(item => {
        message += `• ${item.product.name} x${item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}€\n`;
    });
    
    const subtotal = calculateTotal();
    const deliveryCost = subtotal >= 25 ? 0 : 5;
    const total = subtotal + deliveryCost;
    
    message += `\n📊 *Récapitulatif :*\n`;
    message += `Sous-total: ${subtotal.toFixed(2)}€\n`;
    message += `Livraison: ${deliveryCost === 0 ? 'Gratuite' : deliveryCost.toFixed(2) + '€'}\n`;
    message += `*Total: ${total.toFixed(2)}€*\n\n`;
    message += 'Merci ! 😊';
    
    const phoneNumber = '33784952250'; // Votre numéro WhatsApp avec indicatif +33
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Initialisation
function init() {
    // Rendu des produits
    const newProducts = products.filter(p => p.isNew).slice(0, 4);
    const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
    
    const newProductsGrid = document.getElementById('new-products');
    const bestSellersGrid = document.getElementById('best-sellers');
    
    newProducts.forEach(product => {
        newProductsGrid.appendChild(createProductCard(product));
    });
    
    bestSellers.forEach(product => {
        bestSellersGrid.appendChild(createProductCard(product));
    });
    
    // Configuration des événements
    setupProductQuantities();
    
    // Bouton panier flottant
    document.getElementById('floating-cart-btn').addEventListener('click', scrollToCart);
    
    // Bouton WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', orderViaWhatsApp);
    }
    
    // Initialisation du panier
    updateCartCount();
    renderCart();
    
    // Démarrage des animations
    startTitleAnimations();
}

// Démarrage quand le DOM est prêt
document.addEventListener('DOMContentLoaded', init);

// Exposition des fonctions globales pour les onclick
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.orderViaWhatsApp = orderViaWhatsApp;