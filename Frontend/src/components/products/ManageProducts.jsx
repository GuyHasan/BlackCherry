function ManageProducts() {
	return (
		<>
			<h1>ניהול מוצרים</h1>
			<p>כאן תוכלו לנהל את המוצרים באתר, להוסיף, לערוך ולמחוק מוצרים.</p>
			<Link to='/admin/products/add' className='btn btn-primary'>
				הוספת מוצר חדש
			</Link>
		</>
	);
}

export default ManageProducts;
