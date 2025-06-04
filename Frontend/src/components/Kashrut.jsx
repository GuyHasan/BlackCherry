import SEO from "./SEO";

function Kashrut() {
	return (
		<>
			<SEO title='כשרות - החנות שלי' description='מידע על כשרות המוצרים שלנו.' keywords={["כשרות", "מוצרים כשרים", "החנות שלי"]} />
			<div className='container my-5'>
				<div className='card shadow'>
					<div className='card-body'>
						<h1 className='card-title text-center mb-4'>כשרות</h1>
						<p className='card-text'>מידע על כשרות המוצרים שלנו.</p>
						<ul className='list-group list-group-flush mb-3'>
							<li className='list-group-item'>כל המוצרים בחנות שלנו הם כשרים.</li>
							<li className='list-group-item'>אנחנו מקפידים על כללי הכשרות ומוודאים שכל המוצרים עומדים בדרישות הכשרות הנדרשות.</li>
							<li className='list-group-item'>אם יש לך שאלות נוספות על הכשרות של המוצרים, אל תהסס לפנות אלינו.</li>
						</ul>
						<p className='fw-bold text-success'>תודה שבחרת לקנות אצלנו!</p>
						<div className='alert alert-info mt-4' dir='rtl'>
							בלאק צ'רי – מטבח חלבי כשר למהדרין בהשגחת הרבנות אור יהודה
							<br />
							בלאק צ'רי – מטבח בשרי כשר בהשגחת הרבנות אור יהודה
							<br />
							<span className='fw-bold'>*אפשרות לבשר גלאט כשר*</span>
							<br />
							כל הירקות הינם גוש קטיף
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Kashrut;
