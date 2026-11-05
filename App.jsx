import { useState, useEffect } from "react";
import foods from "./data/foods";
import FoodCard from "./components/FoodCard";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const CATEGORIES = ["All", "Biryani", "Burgers", "Pizza", "Rice", "Snacks", "Drinks"];

function App() {
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }

    function addToCart(food) {
        setCart((currentCart) => {
            const existing = currentCart.find((item) => item.id === food.id);

            if (existing) {
                return currentCart.map((item) =>
                    item.id === food.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentCart, { ...food, quantity: 1 }];
        });
    }

    function changeQuantity(id, amount) {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + amount }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function removeFromCart(id) {
        setCart((currentCart) =>
            currentCart.filter((item) => item.id !== id)
        );
    }

    function clearCart() {
        setCart([]);
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const filteredFoods =
        selectedCategory === "All"
            ? foods
            : foods.filter((food) => food.category === selectedCategory);

    return (
        <div className="app-container">
            <header className="navbar">
                <a className="brand" href="#">
                    <span className="brand-logo">🍽️</span>
                    <span className="brand-text">Yummy Foods</span>
                </a>

                <nav>
                    <a href="#home">Home</a>
                    <a href="#menu">Menu</a>
                    <a href="#cart" className="nav-cart-link">
                        <span>Cart</span>
                        <span className="cart-counter">{totalItems}</span>
                    </a>
                    <button
                        type="button"
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
                        aria-label="Toggle color theme"
                    >
                        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
                    </button>
                </nav>
            </header>

            <main>
                <section className="hero" id="home">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span>🔥 FRESH • CRAFTED WITH PASSION • FAST DELIVERY</span>
                        </div>

                        <h1>
                            Good Food, <br />
                            <span className="hero-gradient-text">Great Mood!</span>
                        </h1>

                        <p className="hero-subtext">
                            Experience freshly made gourmet favorites prepared with royal spices.
                            Pick your meal and order seamlessly through WhatsApp in seconds.
                        </p>

                        <div className="hero-actions">
                            <a href="#menu" className="hero-primary-btn">
                                Explore Menu ↓
                            </a>
                            <a href="#cart" className="hero-secondary-btn">
                                View Cart ({totalItems})
                            </a>
                        </div>

                        <div className="hero-perks">
                            <div className="perk-item">
                                <span className="perk-icon">⚡</span>
                                <span>Fast Delivery</span>
                            </div>
                            <div className="perk-item">
                                <span className="perk-icon">🥘</span>
                                <span>Hygienic Kitchen</span>
                            </div>
                            <div className="perk-item">
                                <span className="perk-icon">💬</span>
                                <span>WhatsApp Instant Order</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="menu-section" id="menu">
                    <div className="section-heading">
                        <div>
                            <span className="category-subtitle">CHEF'S SPECIALS</span>
                            <h2>Our Popular Menu</h2>
                        </div>
                        <p className="section-note">Handcrafted delicious meals made to order</p>
                    </div>

                    <div className="category-filter-bar">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`category-filter-chip ${
                                    selectedCategory === cat ? "active" : ""
                                }`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="food-grid">
                        {filteredFoods.map((food) => (
                            <FoodCard
                                key={food.id}
                                food={food}
                                onAdd={addToCart}
                            />
                        ))}
                    </div>
                </section>

                <div className="order-layout">
                    <Cart
                        cart={cart}
                        onQuantityChange={changeQuantity}
                        onRemove={removeFromCart}
                    />

                    <Checkout
                        cart={cart}
                        total={total}
                        onOrderSuccess={clearCart}
                    />
                </div>
            </main>

            <footer>
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="footer-logo">🍽️</span>
                        <strong>Yummy Foods</strong>
                    </div>
                    <p>© 2026 Yummy Foods · Freshness in every bite. Order via WhatsApp.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;