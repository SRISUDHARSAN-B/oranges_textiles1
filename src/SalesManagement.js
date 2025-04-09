import React, { useState } from 'react';
import './SalesManagement.css';

function SalesManagement({ dhoties, setDhoties, sales, setSales }) {
    const [newSale, setNewSale] = useState({ dhotiId: 1, quantity: 0, price: 0, saleDate: '' });

    const handleSaleChange = (e) => {
        const { name, value } = e.target;
        let parsedValue = value;
        if (name === 'quantity' || name === 'price') {
            parsedValue = parseFloat(value);
            if (isNaN(parsedValue)) {
                parsedValue = 0;
            }
        }
        setNewSale({ ...newSale, [name]: parsedValue });
    };

    const handleAddSale = () => {
        if (newSale.quantity <= 0 || newSale.price <= 0 || !newSale.saleDate) {
            alert("Please enter valid sale details.");
            return;
        }

        const selectedDhoti = dhoties.find((d) => d.id === parseInt(newSale.dhotiId, 10));
        if (selectedDhoti) {
            if (selectedDhoti.quantity < newSale.quantity) {
                alert("Not enough dhotis in stock to fulfill this sale.");
                return;
            }
            const updatedDhoties = dhoties.map((d) =>
                d.id === parseInt(newSale.dhotiId, 10) ? { ...d, quantity: d.quantity - newSale.quantity } : d
            );
            setDhoties(updatedDhoties);

            setSales([...sales, { ...newSale, id: Date.now(), dhotiName: selectedDhoti.typeName }]); // Using Date.now() for a simple unique ID
            setNewSale({ dhotiId: 1, quantity: 0, price: 0, saleDate: '' });
        } else {
            alert("Invalid dhoti selected for sale.");
        }
    };

    return (
        <div className="sales-management-card">
            <div className="card-header">
                <h2 className="card-title">Sales Management</h2>
                <p className="card-description">Manage wholesale dhoti sales</p>
            </div>
            <div className="card-body">
                <div className="add-sale-section">
                    <h3 className="section-title">Add Sale</h3>
                    <div className="add-sale-form">
                        <select
                            onChange={handleSaleChange}
                            name="dhotiId"
                            value={newSale.dhotiId}
                        >
                            <option value="">Dhoti</option>
                            {dhoties.map((dhoti) => (
                                <option key={dhoti.id} value={dhoti.id}>
                                    {dhoti.typeName}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={newSale.quantity}
                            onChange={handleSaleChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={newSale.price}
                            onChange={handleSaleChange}
                        />
                        <input
                            type="date"
                            name="saleDate"
                            placeholder="Sale Date"
                            value={newSale.saleDate}
                            onChange={handleSaleChange}
                        />
                    </div>
                    <button onClick={handleAddSale} className="add-button">Add Sale</button>
                </div>

                <div className="sales-history-section">
                    <h3 className="section-title">Sales History</h3>
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Dhoti</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Sale Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => (
                                <tr key={sale.id}>
                                    <td>{sale.id}</td>
                                    <td>{sale.dhotiName}</td>
                                    <td>{sale.quantity}</td>
                                    <td>{sale.price}</td>
                                    <td>{sale.saleDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SalesManagement;