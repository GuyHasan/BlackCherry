import SEO from "./SEO";

function Contact() {
	return (
		<>
			<SEO title='צור קשר - החנות שלי' description='צרו קשר עם צוות התמיכה שלנו לכל שאלה או בעיה.' keywords={["צור קשר", "תמיכה", "החנות שלי"]} />
			<div className='container my-5'>
				<div className='row justify-content-center'>
					<div className='col-md-8 col-lg-6'>
						<div className='card shadow-sm'>
							<div className='card-body'>
								<h3 className='card-title text-center mb-4'>צור קשר</h3>
								<p className='text-center'>יש לך שאלה? רוצה לקבל מידע נוסף? אנחנו כאן בשבילך!</p>
								<ul className='list-group list-group-flush mb-3'>
									<li className='list-group-item'>
										<strong>טלפון:</strong> <a href='tel:+972529911184'>052-9911184</a>
									</li>
									<li className='list-group-item'>
										<strong>דוא"ל:</strong> <a href='mailto:Info@blackcherry.co.il'>Info@blackcherry.co.il</a>
									</li>
									<li className='list-group-item'>
										<strong>כתובת:</strong> רחוב הדקל 10, אור יהודה
									</li>
								</ul>
								<p className='text-center'>אנחנו זמינים לענות על כל שאלה או בקשה, ונשמח לעזור לך בכל מה שצריך.</p>
								<p className='text-center mb-0'>תודה שבחרת בנו!</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Contact;
