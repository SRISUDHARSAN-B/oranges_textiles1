import React, { useState } from 'react';
import YarnManagement from './YarnManagement';
import DhotiManagement from './DhotiManagement';
import SalesManagement from './SalesManagement';
import './StockManagement.css';

// --- Sample Data (Replace with actual backend API calls) ---
const initialYarns = [
    { id: 1, name: 'Cotton Yarn 40s', quantity: 1000, unit: 'kg', pricePerUnit: 200 },
    { id: 2, name: 'Silk Yarn 60s', quantity: 500, unit: 'kg', pricePerUnit: 400 },
    { id: 3, name: 'Polyester Yarn 30s', quantity: 800, unit: 'kg', pricePerUnit: 150 },
];

const initialDhotiTypes = [
    { id: 1, name: 'Cotton Dhoti - Plain White', productionCost: 150, requiredYarnPerPiece: 2 },
    { id: 2, name: 'Silk Dhoti - Golden Border', productionCost: 300, requiredYarnPerPiece: 1.5 },
    { id: 3, name: 'Cotton Dhoti - Colored Stripes', productionCost: 180, requiredYarnPerPiece: 2.5 },
    { id: 4, name: 'Silk Dhoti - Silver Zari', productionCost: 350, requiredYarnPerPiece: 1.8 },
    { id: 5, name: 'Cotton Dhoti - Checked Pattern', productionCost: 200, requiredYarnPerPiece: 2.2 },
];

const initialDhoties = [
  {id: 1, typeId: 1, typeName: "Cotton Dhoti - Plain White", quantity: 50, productionCost: 150 },
  {id: 2, typeId: 2, typeName: "Silk Dhoti - Golden Border", quantity: 30, productionCost: 300 },
];

const initialSales = [
    { id: 1, dhotiId: 1, dhotiName: 'Cotton Dhoti - Plain White', quantity: 10, price: 2000, saleDate: '2024-07-28' },
    { id: 2, dhotiId: 2, dhotiName: 'Silk Dhoti - Golden Border', quantity: 5, price: 2500, saleDate: '2024-07-28' },
];

// --- Helper Functions ---
const calculateTotalCost = (yarns) => {
    return yarns.reduce((total, yarn) => total + (yarn.quantity * yarn.pricePerUnit), 0);
};

const calculateTotalRevenue = (sales) => {
    return sales.reduce((total, sale) => total + sale.price, 0);
};

const calculateTotalProfit = (yarns, sales, dhoties) => {
    const yarnCost = calculateTotalCost(yarns);
    const revenue = calculateTotalRevenue(sales);
    const productionCost = dhoties.reduce((total, dhoti) => total + (dhoti.quantity * dhoti.productionCost), 0);
    return revenue - (yarnCost + productionCost);
};

const calculateWastage = (initialYarns, dhoties, dhotiTypes) => {
    let totalYarnUsed = 0;
    dhoties.forEach(dhoti => {
        const dhotiType = dhotiTypes.find(type => type.id === dhoti.typeId);
        if (dhotiType) {
            totalYarnUsed += dhoti.quantity * dhotiType.requiredYarnPerPiece;
        }
    });

    const initialYarnQuantity = initialYarns.reduce((sum, yarn) => sum + yarn.quantity, 0);
    return initialYarnQuantity - totalYarnUsed;
};

function StockManagement() {
    // --- State ---
    const [yarns, setYarns] = useState(initialYarns);
    const [dhotiTypes, setDhotiTypes] = useState(initialDhotiTypes);
    const [dhoties, setDhoties] = useState(initialDhoties);
    const [sales, setSales] = useState(initialSales);
    const [showFinancials, setShowFinancials] = useState(false);

    // --- Calculations ---
    const totalYarnCost = calculateTotalCost(yarns);
    const totalRevenue = calculateTotalRevenue(sales);
    const totalProfit = calculateTotalProfit(yarns, sales, dhoties);
    const totalWastage = calculateWastage(initialYarns, dhoties, dhotiTypes);

    return (
        <div className="stock-management-container">
            <h1 className="main-title">Orange Textiles Stock Management</h1>

            <div className="management-sections">
                <YarnManagement yarns={yarns} setYarns={setYarns} />
                <DhotiManagement
                    yarns={yarns}
                    setYarns={setYarns}
                    dhoties={dhoties}
                    setDhoties={setDhoties}
                    dhotiTypes={dhotiTypes}
                />
                <SalesManagement dhoties={dhoties} setDhoties={setDhoties} sales={sales} setSales={setSales} />
            </div>

            {/* Financial Overview Section */}
            <div className="financial-overview-card">
                <div className="card-header">
                    <h2 className="card-title">Financial Overview</h2>
                    <p className="card-description">
                        Summary of costs, revenue, and profit.
                        <button
                            className="financials-toggle-button"
                            onClick={() => setShowFinancials(!showFinancials)}
                        >
                            {showFinancials ? "Hide" : "Show"} Financials
                        </button>
                    </p>
                </div>
                <div className="card-body">
                    {showFinancials && (
                        <div className="financial-metrics">
                            <div className="metric-card">
                                <h4 className="metric-title">Total Yarn Cost</h4>
                                <p className="metric-value">{totalYarnCost} ₹</p>
                            </div>
                            <div className="metric-card">
                                <h4 className="metric-title">Total Revenue</h4>
                                <p className="metric-value">{totalRevenue} ₹</p>
                            </div>
                            <div className="metric-card">
                                <h4 className="metric-title">Total Profit</h4>
                                <p className="metric-value">{totalProfit} ₹</p>
                            </div>
                            <div className="metric-card">
                                <h4 className="metric-title">Total Wastage</h4>
                                <p className="metric-value">{totalWastage} kg</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default StockManagement;