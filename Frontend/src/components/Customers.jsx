import "../style/CustomerCarousel.css";

const CustomerCarousel = ({ customers }) => {
	// Duplicate the customers array to create a seamless infinite loop
	return (
		<div className='carousel-container'>
			<div className='carousel-track'>
				{customers.map((customer, index) => (
					<div key={`customer-${index}`} className='customer' style={{ backgroundColor: customer.color }}>
						{customer.color}
					</div>
				))}
				{customers.map((customer, index) => (
					<div key={`customer-dup-${index}`} className='customer' style={{ backgroundColor: customer.color }}>
						{customer.color}
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomerCarousel;
