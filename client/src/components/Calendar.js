import React, { useEffect, useState } from 'react';
import '../styles/Calendar.css';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Calendar = () => {
	const [curDate, setCurDate] = useState({
		date: new Date(),
		month: new Date().getMonth(),
		year: new Date().getFullYear()
	});

	useEffect(() => {
	},[]);

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

	const handleCell = () => {
		console.log('cell clicked');
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
				// <Col className="days-column" key={i}>
				// 	{days[i].toUpperCase()}
				// </Col>
				<th className="days-column" key={i}>
					{days[i].toUpperCase()}
				</th>
			);
		}
		return (
			// <Container>
			// 	<Row className="days-row">
			// 		{daysEl}
			// 	</Row>
			// </Container>
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
						// <Col className={`cell activeCell`} key={date}>
						// 	{date}
						// </Col>
						<td className={`cell ${curDate.date.getDate() > date ? 'pastDateCell' : 'activeCell'} ${curDate.date.getDate() === date ? 'today' : ''}`} 
							key={date}
							onClick={handleCell}
						>
							{date}
						</td>
					);
					date++;
				} else {
					let nextMonth = new Date(curDate.year, curDate.month+1);
					days.push(
						// <Col className={`cell disabledCell`} key={`nextMonth-${nextMonthDates}`} aria-disabled>
						// 	<span>{nextMonthDates === 1 ? nextMonth.toLocaleString('default', { month: 'short' }) : ''}</span> {nextMonthDates}
						// </Col>
						<td className={`cell disabledCell`} key={`nextMonth-${nextMonthDates}`} aria-disabled>
							<span>{nextMonthDates === 1 ? nextMonth.toLocaleString('default', { month: 'short' }) : ''}</span> {nextMonthDates}
						</td>
					);
					nextMonthDates++;
				}
			}
			rows.push(
				// <Row className="week" key={row}>
				// 	{days}
				// </Row>

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
			<h5>Book your appointment</h5>
			<Header />
			<Table className="curMonth-calendar" bordered>
				<DaysOfWeek />
				<Cells />
			</Table>
		</div>
	);
};

export default Calendar;