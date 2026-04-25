// src/App.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateField, fillForm, resetForm } from "./store";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.interaction.form);

  const [chatMessage, setChatMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    dispatch(updateField({ name: e.target.name, value: e.target.value }));
  };

  const handleAI = async () => {
    if (!chatMessage.trim()) return;

    setStatus("AI is analyzing...");
    try {
      const res = await axios.post(`${API_URL}/ai/chat`, {
        message: chatMessage,
      });

      dispatch(fillForm(res.data));
      setAiResponse(JSON.stringify(res.data, null, 2));
      setStatus("AI filled the form successfully.");
    } catch (error) {
      setStatus("AI error. Check backend.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Saving interaction...");
    try {
      const res = await axios.post(`${API_URL}/interactions/`, form);
      setStatus(`Interaction saved successfully with ID: ${res.data.id}`);
      dispatch(resetForm());
      setChatMessage("");
      setAiResponse("");
    } catch (error) {
      setStatus("Save error. Check backend.");
    }
  };

  return (
    <div className="app">
      <h1>AI-First CRM — Log HCP Interaction</h1>

      <div className="layout">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h2>Interaction Details</h2>

          <label>HCP Name</label>
          <input name="hcp_name" value={form.hcp_name} onChange={handleChange} />

          <label>Interaction Type</label>
          <select
            name="interaction_type"
            value={form.interaction_type}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="Meeting">Meeting</option>
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Visit">Visit</option>
          </select>

          <div className="row">
            <div>
              <label>Date</label>
              <input name="date" type="date" value={form.date} onChange={handleChange} />
            </div>

            <div>
              <label>Time</label>
              <input name="time" type="time" value={form.time} onChange={handleChange} />
            </div>
          </div>

          <label>Topics Discussed</label>
          <textarea name="topics" value={form.topics} onChange={handleChange} />

          <label>Observed HCP Sentiment</label>
          <select name="sentiment" value={form.sentiment} onChange={handleChange}>
            <option value="">Select sentiment</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>

          <label>Outcome</label>
          <textarea name="outcome" value={form.outcome} onChange={handleChange} />

          <label>Follow-up Action</label>
          <textarea name="follow_up" value={form.follow_up} onChange={handleChange} />

          <button type="submit">Save Interaction</button>
        </form>

        <div className="card chat-card">
          <h2>AI Assistant</h2>
          <p>Describe the interaction naturally. AI will extract the fields.</p>

          <textarea
            className="chat-input"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Example: Met Dr Ahmed, discussed Product X, he was positive and asked for samples. Follow up next week."
          />

          <button type="button" onClick={handleAI}>
            Analyze with AI
          </button>

          <h3>AI Output</h3>
          <pre>{aiResponse || "No AI response yet."}</pre>

          <p className="status">{status}</p>
        </div>
      </div>
    </div>
  );
}

export default App;