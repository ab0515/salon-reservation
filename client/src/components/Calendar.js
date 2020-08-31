import React, { useEffect, useState } from 'react';
import '../styles/Calendar.css';
import { Row, Col, Container } from 'react-bootstrap';

const Calendar = () => {
	const [curDate, setCurDate] = useState({
		date: new Date(),
		month: new Date().getMonth(),
		year: new Date().getFullYear()
	});

	useEffect(() => {
	},[]);

	const header = () => {
		let monthName = curDate.date.toLocaleString('default', { month: 'long' });

		return (
			<div className="calendar-header">
				<div>{curDate.year} {monthName}</div>
			</div>
		)
	};

	const daysOfWeek = () => {
		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		const daysEl = [];

		for (let i=0; i<7; i++) {
			daysEl.push(
				<Col className="days-column" key={i}>
					{days[i].toUpperCase()}
				</Col>
			);
		}
		return (
			<Container>
				<Row className="days-row">
					{daysEl}
				</Row>
			</Container>
		);
	};

	const daysInMonth = (year, month) => {
		let d = new Date(year, month, 32);
		return 32 - d.getDate();
	}

	const cells = () => {
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
					<Col className={`cell disabledCell`} key={`prev-${i}`} aria-disabled>
						{prevNDays - (firstDay-1-i)}
					</Col>
				);
			}
		}

		let date = 1;
		let row = 0;
		// while (date <= nDays) {
		// 	for (let i=days.length; i<7; i++) {
		// 		days.push(
		// 			<Col className={`cell activeCell`} key={date}>
		// 				{date}
		// 			</Col>
		// 		);
		// 		date++;
		// 	}
		// 	rows.push(
		// 		<Row className="week" key={row}>
		// 			{days}
		// 		</Row>
		// 	);
		// 	row++;
		// 	days = [];
		// }
		let nextMonthDates = 1;
		for (let i=0; i<6; i++) {
			for (let j=days.length; j<7; j++) {
				if (date <= nDays) {
					days.push(
						<Col className={`cell activeCell`} key={date}>
							{date}
						</Col>
					);
					date++;
				} else {
					days.push(
						<Col className={`cell disabledCell`} key={`nextMonth-${nextMonthDates}`} aria-disabled>
							{nextMonthDates}
						</Col>
					);
					nextMonthDates++;
				}
			}
			rows.push(
				<Row className="week" key={row}>
					{days}
				</Row>
			);
			row++;
			days = [];
		}

		return <Container className="body">{rows}</Container>;
	}


	return (
		<div className="calendar">
			<div>{header()}</div>
			<div>{daysOfWeek()}</div>
			<div>{cells()}</div>
		</div>
	);
};

export default Calendar;