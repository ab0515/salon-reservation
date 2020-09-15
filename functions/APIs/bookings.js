exports.getAllBookings = (req, res) => {
	bookings = [
		{
			'id': 1,
			'time': '11:00AM',
			'bookedBy': 'jimmy'
		},
		{
			'id': 2,
			'time': '1:00PM',
			'bookedBy': 'sally'
		}
	];
	return res.json(bookings);
};