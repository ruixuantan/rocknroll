import React from "react"
import Roller from "./components/Roller"
import "./App.css"

const App = () => {
	return (
		<div>
			<div className="container">
				<span className="header"><h1>Rock n Roll</h1></span>
			</div>
			<Roller />
		</div>
	)
}

export default App
