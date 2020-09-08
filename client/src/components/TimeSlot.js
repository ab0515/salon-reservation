import React, { useState, useEffect } from 'react';
import '../styles/TimeSlot.css';
import 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';

const TimeSlot = ({handleSelected}) => {
	const slots = [
		'10:00 AM',
		'11:00 AM',
		'12:00 PM',
		'1:00 PM',
		'2:00 PM',
		'3:00 PM',
		'4:00 PM',
		'5:00 PM',
		'6:00 PM',
		'7:00 PM'
	];

	const [activeLink, setActiveLink] = useState(null);

	const handleClick = id => {
		// console.log(`Your reservation is on ${selectedDate.monthName} ${selectedDate.date}, ${selectedDate.year}`);
		setActiveLink(id);
		handleSelected(slots[id]);
	};

	const SlotList = () => {
		return (
			<div className="body">
				{
					slots.map((slot, idx) => {
						return (
							<div onClick={() => handleClick(idx)} 
								key={idx}
								className={`slot ${idx === activeLink ? 'activeSlot' : ''}`}>
								{slot}
							</div>
						);
					})
				}
			</div>
		);
	};
	
	return (
		<div className="container">
			<SlotList />
		</div>
	);
};

export default TimeSlot;

