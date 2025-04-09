import React, { useState } from 'react';
import './YarnManagement.css';

function YarnManagement({ yarns, setYarns }) {
    const [newYarn, setNewYarn] = useState({ name: '', quantity: 0, unit: 'kg', pricePerUnit: 0 });

    const handleYarnChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;
        if (name === 'quantity' || name === 'pricePerUnit') {
            parsedValue = parseFloat(value);
            if (isNaN(parsedValue)) {
                parsedValue = 0;
            }
        }
        setNewYarn({ ...newYarn, [name]: parsedValue });
    };

    const handleAddYarn = () => {
        if (!newYarn.name.trim() || newYarn.quantity <= 0 || newYarn.pricePerUnit <= 0) {
            alert('Please enter valid yarn details.');
            return;
        }
        setYarns([...yarns, { ...newYarn, id: Date.now() }]); // Using Date.now() for a simple unique ID
        setNewYarn({ name: '', quantity: 0, unit: 'kg', pricePerUnit: 0 });
    };

    return (
        <div className="yarn-management-card">
            <div className="card-header">
                <h2 className="card-title">Yarn Inventory</h2>
                <p className="card-description">Manage your yarn stock</p>
            </div>
            <div className="card-body">
                <table className="yarn-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Price/Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {yarns.map((yarn) => (
                            <tr key={yarn.id}>
                                <td>{yarn.id}</td>
                                <td>{yarn.name}</td>
                                <td>{yarn.quantity}</td>
                                <td>{yarn.unit}</td>
                                <td>{yarn.pricePerUnit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="add-yarn-section">
                    <h3 className="section-title">Add Yarn</h3>
                    <div className="add-yarn-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Yarn Name"
                            value={newYarn.name}
                            onChange={handleYarnChange}
                        />
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={newYarn.quantity}
                            onChange={handleYarnChange}
                        />
                        <select
                            onChange={(e) => handleYarnChange({ target: { name: 'unit', value: e.target.value } })}
                            value={newYarn.unit}
                        >
                            <option value="">Unit</option>
                            <option value="kg">kg</option>
                            <option value="pounds">pounds</option>
                            <option value="meters">meters</option>
                        </select>
                        <input
                            type="number"
                            name="pricePerUnit"
                            placeholder="Price/Unit"
                            value={newYarn.pricePerUnit}
                            onChange={handleYarnChange}
                        />
                    </div>
                    <button onClick={handleAddYarn} className="add-button">Add Yarn</button>
                </div>
            </div>
        </div>
    );
}

export default YarnManagement;