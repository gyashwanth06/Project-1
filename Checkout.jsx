import { useState } from "react";

function Checkout({ cart, total, onOrderSuccess }) {
    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: ""
    });

    const [error, setError] = useState("");

    function handleChange(event) {
        setCustomer({
            ...customer,
            [event.target.name]: event.target.value
        });
    }

    function handleOrder(event) {
        event.preventDefault();
        setError("");

        if (cart.length === 0) {
            setError("Please add food to your cart first.");
            return;
        }

        let phone = customer.phone.replace(/\D/g, "");

        // Support Indian numbers with +91 or leading 0
        if (phone.length === 12 && phone.startsWith("91")) {
            phone = phone.slice(2);
        } else if (phone.length === 11 && phone.startsWith("0")) {
            phone = phone.slice(1);
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
            setError("Enter a valid 10-digit Indian mobile number (e.g. 9876543210).");
            return;
        }

        const restaurantNumber = "919502304090";

        const items = cart
            .map(
                (item) =>
                    `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
            )
            .join("\n");

        const message = [
            "🍔 *NEW FOOD ORDER* 🍕",
            "-------------------------",
            `👤 *Customer:* ${customer.name.trim()}`,
            `📞 *Phone:* ${phone}`,
            `📍 *Delivery Address:* ${customer.address.trim()}`,
            "",
            "📋 *ORDER ITEMS:*",
            items,
            "",
            `💰 *Total Amount:* ₹${total}`,
            "-------------------------",
            "Please confirm my order and share estimated delivery time. Thank you!"
        ].join("\n");

        const whatsappUrl =
            `https://wa.me/${restaurantNumber}` +
            `?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

        if (onOrderSuccess) {
            onOrderSuccess();
        }
    }

    return (
        <section className="checkout-section" id="checkout">
            <div className="checkout-header">
                <h2>Fast Checkout</h2>
                <span className="checkout-badge">Direct to WhatsApp</span>
            </div>

            <form onSubmit={handleOrder} className="checkout-form">
                <div className="form-group">
                    <label htmlFor="customer-name">Full Name</label>
                    <input
                        id="customer-name"
                        name="name"
                        value={customer.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customer-phone">Mobile Number</label>
                    <input
                        id="customer-phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        value={customer.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customer-address">Delivery Address</label>
                    <textarea
                        id="customer-address"
                        name="address"
                        value={customer.address}
                        onChange={handleChange}
                        placeholder="House / Flat No, Street, Landmark..."
                        rows={3}
                        required
                    />
                </div>

                {error && (
                    <div className="error-message" role="alert">
                        ⚠️ {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="whatsapp-button"
                    disabled={cart.length === 0}
                >
                    <span className="wa-icon">💬</span> Order via WhatsApp (₹{total})
                </button>

                <p className="checkout-note">
                    🔒 Orders are sent straight to the restaurant kitchen on WhatsApp.
                </p>
            </form>
        </section>
    );
}

export default Checkout;