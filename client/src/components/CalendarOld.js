import React, { useEffect, useState } from 'react';
import '../styles/Calendar.css';
import TimeSlot from './TimeSlot';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { Button, Modal, Toast } from 'react-bootstrap';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Calendar = () => {
	const today = {
		date: new Date(),
		month: new Date().getMonth(),
		year: new Date().getFullYear()
	};
	const [curDate, setCurDate] = useState({
		date: new Date(),
		month: new Date().getMonth(),
		year: new Date().getFullYear()
	});

	const [show, setShow] = useState(false);
	const [reserved, setReserved] = useState(false);
	const [submit, setSubmit] = useState(true);
	const [selectedDate, setSelectedDate] = useState('');

	const handleNextMonth = () => {
		setCurDate({
			date: new Date(curDate.year, curDate.month+1),
			month: new Date(curDate.year, curDate.month+1).getMonth(),
			year: new Date(curDate.year, curDate.month+1).getFullYear()
		});
	};

	const handlePrevMonth = () => {
		setCurDate({
			date: new Date(curDate.year, curDate.month-1),
			month: new Date(curDate.year, curDate.month-1).getMonth(),
			year: new Date(curDate.year, curDate.month-1).getFullYear()
		});
	};

	const handleCell = (date) => {
		console.log(`${date}`);
		// setSelectedDate({
		// 	date: date,
		// 	month: curDate.month,
		// 	monthName: curDate.date.toLocaleString('default', { month: 'long' }),
		// 	year: curDate.year
		// });
		// setShow(true);
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleReserveToggle = () => {
		setReserved(!reserved);
		handleClose();
	};

	const Header = () => {
		let monthName = curDate.date.toLocaleString('default', { month: 'long' });

		return (
			<div className="calendar-header">
				<Button variant="no-border" onClick={handlePrevMonth}><MdKeyboardArrowLeft /></Button>
				<div>{curDate.year} {monthName}</div>
				<Button variant="no-border" onClick={handleNextMonth}><MdKeyboardArrowRight /></Button>
			</div>
		)
	};

	const DaysOfWeek = () => {
		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		const daysEl = [];

		for (let i=0; i<7; i++) {
			daysEl.push(
				<th className="days-column" key={i}>
					{days[i].toUpperCase()}
				</th>
			);
		}
		return (
			<thead>
				<tr>
					{daysEl}
				</tr>
			</thead>
		);
	};

	const daysInMonth = (year, month) => {
		let d = new Date(year, month, 32);
		return 32 - d.getDate();
	}

	const Cells = () => {
		const rows = [];
		let nDays = daysInMonth(curDate.year, curDate.month)	// # of days in the current month

		let d2 = new Date(curDate.year, curDate.month);
		let firstDay = d2.getDay();		// 1st day of the current month

		let days = [];

		if (firstDay > 0) {
			let prevMonth = curDate.month === 0 ? 11 : curDate.month - 1;
			let prevYear = curDate.month === 0 ? curDate.year - 1 : curDate.year;

			let prevNDays = daysInMonth(prevYear, prevMonth);
			
			for (let i=0; i<firstDay; i++) {
				days.push(
					// <Col className={`cell disabledCell`} key={`prev-${i}`} aria-disabled>
					// 	{prevNDays - (firstDay-1-i)}
					// </Col>
					<td className={`cell disabledCell`} key={`prev-${i}`} aria-disabled>
						{prevNDays - (firstDay-1-i)}
					</td>
				);
			}
		}

		let date = 1;
		let row = 0;
		let nextMonthDates = 1;

		for (let i=0; i<6; i++) {
			for (let j=days.length; j<7; j++) {
				if (date <= nDays) {
					days.push(
						<td className={`cell ${curDate.date.getDate() > date ? 'pastDateCell' : 'activeCell'} ${today.month === curDate.month && today.date.getDate() === date ? 'today' : ''}`} 
							key={date}
							onClick={() => handleCell(date)}
						>
							{date}
						</td>
					);
					date++;
				} else {
					let nextMonth = new Date(curDate.year, curDate.month+1);
					days.push(
						<td className={`cell disabledCell`} key={`nextMonth-${nextMonthDates}`} aria-disabled>
							<span>{nextMonthDates === 1 ? nextMonth.toLocaleString('default', { month: 'short' }) : ''}</span> {nextMonthDates}
						</td>
					);
					nextMonthDates++;
				}
			}

			rows.push(
				<tr key={row}>
					{days}
				</tr>
			);
			row++;
			days = [];
		}

		// return <Container className="body">{rows}</Container>;
		return <tbody>{rows}</tbody>;
	}


	return (
		<div className="calendar">
			<div className="main-header">
				Reserve your appointment
			</div>
			<Header />
			<Table className="calendar__curMonth" bordered>
				<DaysOfWeek />
				<Cells />
			</Table>
			
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Select a time slot</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<TimeSlot selectedDate={selectedDate} handleSubmit={() => setSubmit(false)} />
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={handleReserveToggle} disabled={submit}>
						Reserve
					</Button>
				</Modal.Footer>
			</Modal>

			<Toast className="toast-success" show={reserved} onClose={handleReserveToggle} delay={3000}>
				<Toast.Header>
					<strong className="mr-auto">Your reservation is at </strong>
				</Toast.Header>
				<Toast.Body>Successfully reserved</Toast.Body>
			</Toast>
		</div>
	);
};

export default Calendar;