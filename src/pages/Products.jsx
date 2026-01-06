export default function Products() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 20000 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id} style={styles.card}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
  },
};
