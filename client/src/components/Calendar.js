import React, { useState, useEffect } from 'react';
import '../styles/Calendar.css';
import Cells from './Cells';
import TimeSlot from './TimeSlot';

import { Button, Table, Modal } from 'react-bootstrap';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Calendar = () => {
	const [curDate, setCurDate] = useState({
		date: new Date(),
		month: new Date().getMonth(),
		year: new Date().getFullYear()
	});

	const [show, setShow] = useState(false);
	const [timeSelected, setTimeSelected] = useState(false);

	const Header = () => {
		let monthName = curDate.date.toLocaleString('default', { month: 'long' });
		return (
			<div className="calendar-header">
				<Button variant="no-border"><MdKeyboardArrowLeft /></Button>
				<div>{curDate.year} {monthName}</div>
				<Button variant="no-border"><MdKeyboardArrowRight /></Button>
			</div>
		);
	};

	const DaysOfWeek = () => {
		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		const daysEl = [];

		for (let i=0; i<7; i++) {
			daysEl.push(
				<th key={i} className="days-column">
					{days[i].toUpperCase()}
				</th>
			);
		}

		return (
			<thead>
				<tr>{daysEl}</tr>
			</thead>
		);
	};

	const handleCell = ({date}) => {
		console.log(date);
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleSelected = () =>{
		setTimeSelected(!timeSelected);
	};

	const handleReserve = () => {
		handleClose();
	};

	return (
		<div className="calendar">
			<div className="main-header">
				Reserve your appointment
			</div>
			<Header />
			<Table className="calendar__curMonth" bordered>
				<DaysOfWeek />
				<Cells curDate={curDate} handleCell={handleCell} />
			</Table>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Select a time slot</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<TimeSlot handleSelected={handleSelected} />
				</Modal.Body>

				<Modal.Footer>
					<Button disabled={!timeSelected} onClick={handleReserve}>Reserve</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Calendar;