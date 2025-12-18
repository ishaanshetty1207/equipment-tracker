import { useEffect, useState } from "react";
import axios from "axios";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentTable from "./components/EquipmentTable";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // 

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/equipment");
    setEquipment(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEquipment = equipment.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Equipment Tracker</h2>

      <input
        type="text"
        placeholder="Search equipment by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <EquipmentForm
        fetchData={fetchData}
        editing={editing}
        setEditing={setEditing}
      />

      <EquipmentTable
        equipment={filteredEquipment}
        fetchData={fetchData}
        setEditing={setEditing}
      />
    </div>
  );
}

export default App;
