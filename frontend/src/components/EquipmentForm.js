import { useEffect, useState } from "react";
import axios from "axios";

const initialState = {
  name: "",
  type: "Machine",
  status: "Active",
  lastCleaned: "",
};

function EquipmentForm({ fetchData, editing, setEditing }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.lastCleaned) {
      alert("Please fill all fields");
      return;
    }

    if (editing) {
      await axios.put(
        `http://localhost:5000/api/equipment/${editing.id}`,
        form
      );
    } else {
      await axios.post("http://localhost:5000/api/equipment", form);
    }

    setForm(initialState);
    setEditing(null);
    fetchData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editing ? "Edit Equipment" : "Add Equipment"}</h3>

      <input
        type="text"
        name="name"
        placeholder="Equipment Name"
        value={form.name}
        onChange={handleChange}
      />

      <select name="type" value={form.type} onChange={handleChange}>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>

      <input
        type="date"
        name="lastCleaned"
        value={form.lastCleaned}
        onChange={handleChange}
      />

      <button type="submit">
      {editing ? "Update Equipment" : "Add Equipment"}
      </button>

    </form>
  );
}

export default EquipmentForm;
