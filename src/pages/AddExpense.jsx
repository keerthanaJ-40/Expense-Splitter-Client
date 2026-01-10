import React, { useState } from "react";
import "../styles/ExpenseSplitter.css";

const ExpenseSplit = () => {
  const [roommates, setRoommates] = useState([
    "Keerthika",
    "Keerthana",
    "Karthika",
    "Kamali",
    "Madhanisha",
  ]);

  const [expensetype, setExpensetype] = useState([
    "Mess Bill",
    "Trip",
    "Travel",
    "Room Rent",
    "Electricity Bill",
    "Groceries",
  ]);

  const [selected, setSelected] = useState([]);
  const [selectedExpenseType, setSelectedExpenseType] = useState("");
  const [newMate, setNewMate] = useState("");
  const [newOption, setNewOption] = useState("");
  const [amount, setAmount] = useState("");
  const [split, setSplit] = useState({});
  const [splitType, setSplitType] = useState("equal");
  const [individualAmounts, setIndividualAmounts] = useState({});

  const toggleSelect = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((p) => p !== name));
      const updated = { ...individualAmounts };
      delete updated[name];
      setIndividualAmounts(updated);
    } else {
      setSelected([...selected, name]);
    }
  };

  const addRoommate = () => {
    if (newMate.trim()) {
      setRoommates([...roommates, newMate.trim()]);
      setNewMate("");
    }
  };

  const addExpenseType = () => {
    if (newOption.trim()) {
      setExpensetype([...expensetype, newOption.trim()]);
      setNewOption("");
    }
  };

  const calculate = () => {
    if (!amount || selected.length === 0) {
      alert("Please enter amount & select roommates");
      return;
    }

    let result = {};

    if (splitType === "equal") {
      const perPerson = (amount / selected.length).toFixed(2);
      selected.forEach((name) => (result[name] = perPerson));
    } else {
      const total = Object.values(individualAmounts).reduce(
        (a, b) => a + Number(b || 0),
        0
      );
      if (total !== Number(amount)) {
        alert("Amounts do not match total!");
        return;
      }
      result = individualAmounts;
    }

    setSplit(result);
    saveExpense(result); 
  };
  const saveExpense = async (result) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedExpenseType,
          totalAmount: amount,
          splitDetails: result,
          date: new Date()
        }),
      });

      if (response.ok) {
        alert("Expense saved to Cloud! ✅");
      }
    } catch (error) {
      console.log("Save error:", error);
    }
  };


  return (
    <div className="body">
      <div className="container">
        {/* HEADER */}
        <h2>Expense Splitter</h2>
        <p className="desc">
          Split trips, rent & daily expenses effortlessly
        </p>

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Enter total amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* SPLIT TYPE */}
        <div className="split-type">
          <label>
            <input
              type="radio"
              value="equal"
              checked={splitType === "equal"}
              onChange={(e) => setSplitType(e.target.value)}
            />{" "}
            Equal
          </label>

          <label>
            <input
              type="radio"
              value="unequal"
              checked={splitType === "unequal"}
              onChange={(e) => setSplitType(e.target.value)}
            />{" "}
            Unequal
          </label>
        </div>

        {/* ROOMMATES */}
        <h4>Select Roommates</h4>
        <div className="roommates">
          {roommates.map((name, i) => (
            <div
              key={i}
              className={`mate ${selected.includes(name) ? "selected" : ""}`}
              onClick={() => toggleSelect(name)}
            >
              {name}
            </div>
          ))}
        </div>

        <div className="add-box">
          <input
            type="text"
            placeholder="Add roommate"
            value={newMate}
            onChange={(e) => setNewMate(e.target.value)}
          />
          <button onClick={addRoommate}>Add</button>
        </div>

        {/* UNEQUAL */}
        {splitType === "unequal" && selected.length > 0 && (
          <div className="unequal-inputs">
            <h4>Individual Amounts</h4>
            {selected.map((name, i) => (
              <div key={i} className="mate-selected">
                <span>{name}</span>
                <input
                  type="number"
                  placeholder="₹ Amount"
                  value={individualAmounts[name] || ""}
                  onChange={(e) =>
                    setIndividualAmounts({
                      ...individualAmounts,
                      [name]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* EXPENSE TYPE */}
        <h4>Expense Type</h4>
        <div className="expensetype">
          {expensetype.map((type, i) => (
            <div
              key={i}
              className={`type ${selectedExpenseType === type ? "selected" : ""
                }`}
              onClick={() => setSelectedExpenseType(type)}
            >
              {type}
            </div>
          ))}
        </div>

        <div className="add-box">
          <input
            type="text"
            placeholder="Add expense type"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <button onClick={addExpenseType}>Add</button>
        </div>

        {/* BUTTON */}
        <button className="calc-btn" onClick={calculate}>
          Split Expense
        </button>

        {/* RESULT */}
        <div className="result">
          {selectedExpenseType && (
            <h4>Expense : {selectedExpenseType}</h4>
          )}
          {Object.keys(split).map((name, i) => (
            <p key={i}>
              {name} pays ₹ {split[name]}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseSplit;
