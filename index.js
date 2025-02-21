import { useState } from "react";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch("http://localhost:3000/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON or API error");
    }
  };

  return (
    <div className="container">
      <h1>BFHL API</h1>
      <textarea
        rows="4"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='{"data": ["A", "1", "5", "B"]}'
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <select multiple onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <div>
            {selectedOptions.includes("alphabets") && <p>Alphabets: {JSON.stringify(response.alphabets)}</p>}
            {selectedOptions.includes("numbers") && <p>Numbers: {JSON.stringify(response.numbers)}</p>}
            {selectedOptions.includes("highest_alphabet") && <p>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</p>}
          </div>
        </>
      )}
    </div>
  );
}
