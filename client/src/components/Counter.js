import React, { useState, useEffect } from 'react';

const Counter = () => {
	const [count, setCount] = useState(0);
	const [date, setDate] = useState({
		d: new Date(),
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	});
	
	const handleCount = () => {
		setCount(count+1);
	}

	const handleDate = () => {
		setDate({
			d: new Date(date.year, date.month+1),
			month: new Date(date.year, date.month+1).getMonth(),
			year: new Date(date.year, date.month+1).getFullYear(),
		});
	}

	return (
		<div>
			{/* <p>You clicked {count} times</p> */}
			<p>Date is {date.year} {date.month}</p>
			<button onClick={handleDate}>Click me</button>
		</div>
	);
};

export default Counter;