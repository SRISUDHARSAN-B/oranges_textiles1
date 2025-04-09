import React, { useState } from 'react';
import './DhotiManagement.css';

function DhotiManagement({ yarns, setYarns, dhoties, setDhoties, dhotiTypes }) {
    const [newDhoti, setNewDhoti] = useState({ typeId: 1, quantity: 0 });

    const handleDhotiChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = parseInt(value, 10);
        setNewDhoti({ ...newDhoti, [name]: isNaN(parsedValue) ? 0 : parsedValue });
    };

    const handleProduceDhoti = () => {
        if (newDhoti.quantity <= 0) {
            alert("Please enter a valid quantity to produce.");
            return;
        }

        const selectedDhotiType = dhotiTypes.find((type) => type.id === parseInt(newDhoti.typeId, 10));
        if (selectedDhotiType) {
            const requiredYarnPerPiece = selectedDhotiType.requiredYarnPerPiece || 0;
            const requiredYarn = newDhoti.quantity * requiredYarnPerPiece;
            let canProduce = true;
            let tempYarns = [...yarns];

            // Basic check - you might need more sophisticated yarn allocation logic
            if (tempYarns.reduce((sum, yarn) => sum + yarn.quantity, 0) < requiredYarn) {
                canProduce = false;
            } else {
                // Simple deduction from the first available yarn - adjust as needed
                let remainingRequired = requiredYarn;
                tempYarns = tempYarns.map(yarn => {
                    if (remainingRequired > 0) {
                        const deduction = Math.min(remainingRequired, yarn.quantity);
                        remainingRequired -= deduction;
                        return { ...yarn, quantity: yarn.quantity - deduction };
                    }
                    return yarn;
                });
            }

            if (!canProduce) {
                alert("Not enough yarn available to produce this quantity of dhotis.");
                return;
            }
            setYarns(tempYarns);

            const existingDhoti = dhoties.find((d) => d.typeId === parseInt(newDhoti.typeId, 10));
            if (existingDhoti) {
                const updatedDhoties = dhoties.map((d) =>
                    d.typeId === parseInt(newDhoti.typeId, 10)
                        ? { ...d, quantity: d.quantity + newDhoti.quantity }
                        : d
                );
                setDhoties(updatedDhoties);
            } else {
                setDhoties([
                    ...dhoties,
                    {
                        id: Date.now(), // Using Date.now() for a simple unique ID
                        typeId: parseInt(newDhoti.typeId, 10),
                        quantity: newDhoti.quantity,
                        typeName: selectedDhotiType.name,
                        productionCost: selectedDhotiType.productionCost,
                    },
                ]);
            }

            setNewDhoti({ typeId: 1, quantity: 0 });
        } else {
            alert("Invalid dhoti type selected.");
        }
    };

    return (
        <div className="dhoti-management-card">
            <div className="card-header">
                <h2 className="card-title">Dhoti Production</h2>
                <p className="card-description">Produce dhotis from available yarn</p>
            </div>
            <div className="card-body">
                <div className="produce-dhoti-section">
                    <h3 className="section-title">Produce Dhoti</h3>
                    <div className="produce-dhoti-form">
                        <select
                            onChange={handleDhotiChange}
                            name="typeId"
                            value={newDhoti.typeId}
                        >
                            <option value="">Dhoti Type</option>
                            {dhotiTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={newDhoti.quantity}
                            onChange={handleDhotiChange}
                        />
                    </div>
                    <button onClick={handleProduceDhoti} className="produce-button">Produce</button>
                </div>

                <div className="dhoti-inventory-section">
                    <h3 className="section-title">Dhoti Inventory</h3>
                    <table className="dhoti-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Production Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dhoties.map((dhoti) => (
                                <tr key={dhoti.id}>
                                    <td>{dhoti.id}</td>
                                    <td>{dhoti.typeName}</td>
                                    <td>{dhoti.quantity}</td>
                                    <td>{dhoti.productionCost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DhotiManagement;