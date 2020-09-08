import React, { useState, useEffect } from 'react';
import '../styles/Calendar.css';
import Cells from './Cells';
import TimeSlot from './TimeSlot';

import { Button, Table, Modal, Toast } from 'react-bootstrap';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Calendar = () => {
	const [curDate, setCurDate] = useState({
		date: new Date(),
		month: new Date().getMonth(),
		year: new Date().getFullYear()
	});

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const [show, setShow] = useState(false);
	const [timeSelected, setTimeSelected] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');
	const [selectedTime, setSelectedTime] = useState('');
	const [showToast, setShowToast] = useState(false);

	const updateCalendar = (x) => {
		setCurDate({
			date: new Date(curDate.year, curDate.month+x),
			month: new Date(curDate.year, curDate.month+x).getMonth(),
			year: new Date(curDate.year, curDate.month+x).getFullYear(),
		});
	};

	const Header = () => {
		let monthName = curDate.date.toLocaleString('default', { month: 'long' });
		return (
			<div className="calendar-header">
				<Button variant="no-border" onClick={() => updateCalendar(-1)}><MdKeyboardArrowLeft /></Button>
				<div>{curDate.year} {monthName}</div>
				<Button variant="no-border" onClick={() => updateCalendar(1)}><MdKeyboardArrowRight /></Button>
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

	const handleCell = (obj) => {
		setSelectedDate(obj);
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleSelected = (time) =>{
		setSelectedTime(time);
		setTimeSelected(!timeSelected);
	};

	const handleReserve = () => {
		handleClose();
		setShowToast(true);
	};

	const showToday = () => {
		setCurDate({
			date: new Date(),
			month: new Date().getMonth(),
			year: new Date().getFullYear()
		});
	};

	return (
		<div className="calendar">
			<div className="main-header">
				Reserve your appointment
			</div>
			<div className="todayBtn-container">
				<Button className="todayBtn" onClick={showToday}>Today</Button>
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

			<Toast className="toast-success" show={showToast}>
				<Toast.Header>
					<strong className="mr-auto">Your reservation is on {monthNames[selectedDate.month]} {selectedDate.date}, {selectedDate.year} at {selectedTime}</strong>
				</Toast.Header>
				<Toast.Body>Successfully reserved</Toast.Body>
			</Toast>
		</div>
	);
};

export default Calendar;