import React, { useState, useEffect } from 'react';
import '../styles/Cells.css';

const Cells = ({curDate, handleCell}) => {
	const today = new Date();

	const daysInMonth = (year, month) => {
		let d = new Date(year, month, 32);
		return 32 - d.getDate();
	}

	const Rows = () => {
		const rows = [];
		let dates = [];
		let nDays = daysInMonth(curDate.year, curDate.month);
		// 1st day of the current month
		let firstDay = new Date(curDate.year, curDate.month).getDay();
		
		if (firstDay > 0) {
			let prevMonth = curDate.month === 0 ? 11 : curDate.month - 1;
			let prevYear = curDate.month === 0 ? curDate.year - 1 : curDate.year;

			let prevNdays = daysInMonth(prevYear, prevMonth);

			for (let i=0; i<firstDay; i++) {
				dates.push(
					<td className={`cell disabledCell`} key={`prev-${i}`} disabled>
						{prevNdays - (firstDay-i-1)}
					</td>
				);
			}
		}

		let date = 1;
		let row = 0;
		let nextMonthDates = 1;

		for (let i=0; i<6; i++) {
			for (let j=dates.length; j<7; j++) {
				let dateObj = {
					'date': date,
					'year': curDate.year, 
					'month': curDate.month
				};
				if (date <= nDays) {
					dates.push(
						<td className={`cell ${curDate.date.getDate() > date ? 'pastDateCell' : 'activeCell'} ${today.getMonth() === curDate.month && today.getDate() === date ? 'today' : ''}`}
							key={date}
							onClick={() => handleCell(dateObj)}
						>
							{date}
						</td>
					);
					date++;
				} else {
					let nextMonth = new Date(curDate.year, curDate.month+1);
					dates.push(
						<td className={`cell disabledCell`} key={`nextMonth-${nextMonthDates}`} disabled>
							<span>{nextMonthDates === 1 ? nextMonth.toLocaleString('default', { month: 'short' }) : '' }</span> {nextMonthDates}
						</td>
					);
					nextMonthDates++;
				}
			}
			rows.push(
				<tr key={row}>
					{dates}
				</tr>
			);
			row++;
			dates = [];
		}

		return <tbody>{rows}</tbody>
	};

	return (
		<Rows />
	);
};

export default Cells;