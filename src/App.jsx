const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const testBackend = async () => {
    console.log("API URL:", API_URL);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "123456",
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);
      alert("Backend connected! Check console.");
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Backend connection failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>RRR ShopKart</h1>
      <button onClick={testBackend}>Test Backend</button>
    </div>
  );
}

export default App;