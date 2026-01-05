function App() {
  const testBackend = async () => {
    const response = await fetch(
      "https://rrr-shopkart-backend.onrender.com/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@test.com",
          password: "123456",
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    alert("Backend connected! Check console.");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>RRR ShopKart</h1>
      <button onClick={testBackend}>Test Backend</button>
    </div>
  );
}

export default App;
