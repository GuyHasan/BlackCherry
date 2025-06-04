import SEO from "./SEO";

function About() {
	return (
		<>
			<SEO title='עלינו - החנות שלי' description='קרא על מי אנחנו, מה אנחנו עושים ולמה לבחור בנו.' keywords={["אודות", "עלינו", "החנות שלי"]} />
			<div className='container my-5'>
				<div className='row justify-content-center'>
					<div className='col-lg-8'>
						<div className='card shadow border-0 bg-white'>
							<div className='card-body p-4'>
								<h1 className='h3 text-center mb-3 text-danger fw-bold border-bottom pb-2'>עלינו</h1>
								<div className='text-end' style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#333" }}>
									<p className='mb-3'>
										<b>בלאק צ'רי · Black Cherry</b> מגשי אירוח · קייטרינג
										<br />
										קייטרינג ומגשי אירוח בלאק צ'רי הוא קייטרינג המנוהל על ידי שף מוביל בעל ניסיון של 25 שנה. לבלאק צ'רי למעלה מ-400 סוגי מנות ומוצרים המיוצרים בשני מטבחים נפרדים: האחד בשרי כשר והשני חלבי כשר.
									</p>
									<p className='mb-3'>
										אנחנו מספקים שירותי קייטרינג ומגשי אירוח ללקוחות פרטיים ועסקיים.
										<br />
										<b>לקוחות פרטיים:</b> כל אירוע פרטי, בר מצווה, בת מצווה, שבת חתן, חלאקה, ברית, בריתה, יום הולדת, יום נישואים, הצעת נישואים ועוד.
										<br />
										<b>לקוחות עסקיים:</b> כל האירועים העסקיים, אירוע חברה, ישיבת צוות, ארוחת בוקר חברה, Happy Hour, השקת מוצר, אירוח אורחים מחו"ל, ג'ורנל קלאבס כנסים ועוד.
										<br />
										<span style={{ color: "#888", fontSize: "0.97em" }}>בין לקוחותינו העסקיים: חברות הייטק, חברות פארמה, חברות ביטוח, שגרירויות ומשרדי ממשלה.</span>
									</p>
									<p className='mb-0'>
										בנוסף, קונדיטוריה בלאק צ'רי מספקת מנות קינוח ייחודיות, בה כל הפריטים מיוצרים על ידי שף קונדיטור מהמובילים בארץ.
										<br />
										יש לנו מעל ל-150 מנות ומוצרים טבעוניים איתן ניתן להרכיב ארוחות טבעוניות שלמות.
										<br />
										<b>שירות יעוץ לאירועים:</b> יש לכם אירוע ולא יודעים מה להזמין? רוצים שהאורחים יהנו אבל לא בטוחים מה להזמין? נוכל לעזור לכם להרכיב את התפריט הייחודי לאירוע שלכם.
										<br />
										<span className='d-block mt-2' style={{ fontSize: "0.98em", color: "#555" }}>
											להצעות מחיר ופרטים נוספים: <a href='mailto:Info@blackcherry.co.il'>Info@blackcherry.co.il</a> | 052-9911184
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
