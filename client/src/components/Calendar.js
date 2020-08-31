import React, { useEffect, useState } from 'react';
import '../styles/Calendar.css';

const Calendar = () => {
	const [curDate, setCurDate] = useState(new Date());

	useEffect(() => {
	},[]);

	const header = () => {
		let monthName = curDate.toLocaleString('default', { month: 'long' });
		let year = curDate.getFullYear();

		return (
			<div className="calendar-header">
				<div>{year} {monthName}</div>
			</div>
		)
	};

	const calendarCell = (cellVal) => {
		return (
			<div className="calendar-cell">
				{cellVal}
			</div>
		);
	};

	const calendarGrid = () => {
		let d = new Date(curDate.getFullYear(), curDate.getMonth(), 32);
		let d2 = new Date(curDate.getFullYear(), curDate.getMonth());

		let firstDay = d2.getDay();	// 0-6: Sun-Sat
		let daysInMonth = 32 - d.getDate();
		let date = 1;

		for (let i=0; i<6; i++) {
			if (date <= daysInMonth) {
				for (let j=0; j<7; j++) {
					if (i === 0 && j < firstDay) {
						return (
							<div className="empty"></div>
						);
					} else {
						return (
							<div>
								{calendarCell(date)}
							</div>
						);
						date++;
					}
				}
			}
		}
	};

	return (
		<div className="calendar">
			<div>{header()}</div>
		</div>
	);
};

export default Calendar;