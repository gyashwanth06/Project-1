function FoodCard({ food, onAdd }) {
    return (
        <div className="food-card">
            <div className="food-image-container">
                <img
                    src={food.image}
                    alt={food.name}
                    className="food-image"
                    loading="lazy"
                />
                <span className="food-badge">{food.category}</span>
            </div>

            <div className="food-details">
                <h3>{food.name}</h3>

                <p>{food.description}</p>

                <div className="food-bottom">
                    <div className="price-tag">
                        <span className="currency">₹</span>
                        <strong className="amount">{food.price}</strong>
                    </div>

                    <button
                        className="add-btn"
                        onClick={() => onAdd(food)}
                        aria-label={`Add ${food.name} to cart`}
                    >
                        <span>+</span> Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FoodCard;