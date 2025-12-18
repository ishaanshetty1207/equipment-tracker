import axios from "axios";

export default function EquipmentTable({ equipment, fetchData, setEditing }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/equipment/${id}`);
    fetchData();
  };

  return (
    <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Last Cleaned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {equipment.length === 0 ? (
          <tr>
            <td colSpan="5">No equipment added</td>
          </tr>
        ) : (
          equipment.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>{item.lastCleaned}</td>
              <td>
                <button onClick={() => setEditing(item)}>Edit </button>
                <button onClick={() => handleDelete(item.id)}>Delete </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
