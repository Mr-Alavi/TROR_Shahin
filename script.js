:root {
  --bg-color: #0d0d0d;
  --card-bg: #161616;
  --neon-pink: #ff007f;
  --neon-cyan: #00f3ff;
  --neon-green: #00ff66;
  --text-color: #ffffff;
  --text-muted: #a0a0a0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: Tahoma, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.container {
  background: var(--card-bg);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
  width: 100%;
  max-width: 450px;
  border: 1px solid rgba(0, 243, 255, 0.3);
}

header h1 {
  text-align: center;
  color: var(--neon-cyan);
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.6);
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.input-section input, .input-section button {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #333;
  background: #222;
  color: var(--text-color);
  font-size: 1rem;
  outline: none;
}

.input-section input:focus {
  border-color: var(--neon-pink);
  box-shadow: 0 0 8px rgba(255, 0, 127, 0.5);
}

.input-section button {
  background: linear-gradient(45deg, var(--neon-pink), var(--neon-cyan));
  border: none;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.input-section button:hover {
  box-shadow: 0 0 15px var(--neon-cyan);
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  background: #1f1f1f;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid var(--neon-green);
  box-shadow: 0 0 5px rgba(0, 255, 102, 0.2);
}

ul li.completed {
  text-decoration: line-through;
  opacity: 0.5;
  border-left-color: var(--text-muted);
}
