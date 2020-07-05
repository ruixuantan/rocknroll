import React, { useState } from "react";
import "./Roller.css"

const roll = (side) => {
  return Math.floor(Math.random() * side) + 1;
}

const Die = ({number, clickEvent}) => {
	const dieName = 'd' + number
	return (
		<button 
			type="button" 
			className="btn btn-sm btn-dark die-btn col-12"
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

	// some sort of a queue
	const updateResult = (die, outcome) => {
		const dieName = 'd' + die
		setResult(prev => {
			const toAdd = { "die": dieName, "outcome": outcome };
			if (clicks < 8) {
				prev[clicks] = toAdd
				setClicks(clicks + 1)
			} else {
				prev.shift();
				prev = [...prev, toAdd];
			}
			return prev
		});
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
				</tbody>
			</table>
			
		</div>
	)
}

export default Roller