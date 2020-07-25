import React, { useState } from "react";
import "./Roller.css"

const roll = (side) => {
	return Math.floor(Math.random() * side) + 1;
}

const expectedValue = (number) => {
	return ((number + 1)/2)
}

const rollPointBuyStat = () => {
	let rolls = [0, 0, 0, 0]
	rolls = rolls.map(() => roll(6))
	rolls.sort().shift()
	return rolls.reduce((x, y) => x + y, 0)
}

const pointBuyArray = () => {
	// Follows Matt Mercer's Point Buy System
	let pointArray = [0, 0, 0, 0, 0, 0]

	while (pointArray.reduce((x, y) => x + y, 0) < 70) {
		pointArray = pointArray.map(score => rollPointBuyStat())
	}

	return pointArray
		.reduce((acc, curr) => acc += "," + curr, "")
		.substr(1)
}

const Die = ({number, clickEvent}) => {
	const dieName = 'd' + number
	return (
		<button 
			type="button" 
			className="btn btn-sm btn-dark die-btn"
			onClick={() => clickEvent()}>
			{dieName}
		</button>
	)
}

const Roller = () => {
	const MAXROWS = 8
	const dice = [4, 6, 8, 10, 12, 20, 100]

	const [results, setResult] = useState(new Array(MAXROWS).fill(null))
	const [clicks, setClicks] = useState(0)
	const [sum, setSum] = useState(0)
	const [expected, setExpected] = useState(0)
	const [pointBuy, setPointBuy] = useState([])

	// some sort of a queue
	const updateResult = (die, outcome) => {
		const dieName = 'd' + die
		setResult(prev => {
			const toAdd = { 
				"die": dieName, 
				"outcome": outcome,
				"expected": expectedValue(die)
			};
			if (clicks < 8) {
				prev[clicks] = toAdd
				setClicks(clicks + 1)
				setSum(sum + outcome)
				setExpected(expected + toAdd.expected)
			} else {
				const popped = prev[0]
				prev.shift();
				prev = [...prev, toAdd];
				setSum(sum + outcome - popped.outcome)
				setExpected(expected + toAdd.expected - popped.expected)
			}
			return prev
		});
	}

	const reset = () => {
		setResult(new Array(MAXROWS).fill(null))
		setClicks(0)
		setSum(0)
		setExpected(0)
		setPointBuy([])
	}

	return (
		<div>
			<div className="container dice-container">
				<div className="row">

				{/* Dice */}
				{dice.map((die, i) =>
					<div className="die-container" key={i} >
						<Die 
							number={die} 
							clickEvent={() => updateResult(die, roll(die))} />
					</div>)}
				</div>
				<div className="die-container">
					<button 
						className="btn btn-info clr-btn"
						onClick={reset}>clear
					</button>
				</div>
			</div>

			{/* Table of die roll results */}
			<table className="table table-sm table-striped results-table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Index</th>
						<th scope="col">Die</th>
						<th scope="col">Result</th>
					</tr>
				</thead>
				<tbody>
					{results.map((res, i) =>
						<tr key={i}>
							<th scope="row">{i+1}</th>
							<td>{res !== null ? res.die : null}</td>
							<td>{res !== null ? res.outcome : null}</td>
						</tr>
						)}
					{/* Sum indicator */}
					<tr>
						<th>sum</th>
						<td></td>
						<td>{sum}</td>
					</tr>
					{/* Expected indicator */}
					<tr>
						<th>expected value</th>
						<td></td>
						<td>{expected.toFixed(2)}</td>
					</tr>
					{/* Point buy */}
					<tr>
						<td><button className="btn btn-sm btn-info" 
												onClick={() => setPointBuy(pointBuyArray())}>
												Point Buy</button></td>
						<td></td>
						<td>{pointBuy}</td>
					</tr>
				</tbody>
			</table>
			
		</div>
	)
}

export default Roller