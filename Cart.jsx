function Cart({ cart, onQuantityChange, onRemove }) {
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const itemCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <section className="cart-section" id="cart">
            <div className="cart-header">
                <h2>Your Cart</h2>
                <span className="cart-badge">{itemCount} items</span>
            </div>

            {cart.length === 0 ? (
                <div className="empty-cart-box">
                    <span className="empty-cart-icon">🛒</span>
                    <p className="empty-cart">
                        Your cart is empty. Add your favorite meals from the menu!
                    </p>
                </div>
            ) : (
                <>
                    <div className="cart-items-list">
                        {cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-item-thumb"
                                        loading="lazy"
                                    />
                                )}
                                <div className="cart-item-details">
                                    <div className="cart-item-info">
                                        <strong>{item.name}</strong>
                                        <span className="cart-item-price">
                                            ₹{item.price * item.quantity}
                                        </span>
                                    </div>

                                    <div className="quantity-controls">
                                        <button
                                            type="button"
                                            className="qty-btn"
                                            onClick={() =>
                                                onQuantityChange(item.id, -1)
                                            }
                                            aria-label={`Decrease ${item.name} quantity`}
                                        >
                                            −
                                        </button>

                                        <span className="qty-number">{item.quantity}</span>

                                        <button
                                            type="button"
                                            className="qty-btn"
                                            onClick={() =>
                                                onQuantityChange(item.id, 1)
                                            }
                                            aria-label={`Increase ${item.name} quantity`}
                                        >
                                            +
                                        </button>

                                        <button
                                            type="button"
                                            className="remove-button"
                                            onClick={() => onRemove(item.id)}
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total-box">
                        <div className="cart-total-row">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="cart-total-row delivery-free">
                            <span>Delivery</span>
                            <span className="free-tag">FREE</span>
                        </div>
                        <div className="cart-total-divider"></div>
                        <div className="cart-total-row total-highlight">
                            <span>Total</span>
                            <strong>₹{total}</strong>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default Cart;