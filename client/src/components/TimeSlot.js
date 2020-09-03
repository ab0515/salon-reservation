import React, { useState, useEffect } from 'react';
import '../styles/TimeSlot.css';
import 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';

const TimeSlot = () => {
	const [slots, setSlots] = useState([
		'9:00',
		'10:00',
		'11:00',
		'12:00 PM',
		'1:00',
		'2:00',
		'3:00',
		'4:00',
		'5:00',
		'6:00',
		'7:00'
	]);

	const [activeLink, setActiveLink] = useState(null);

	const handleClick = id => {
		setActiveLink(id);
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

