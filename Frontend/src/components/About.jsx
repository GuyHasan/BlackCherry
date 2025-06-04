import SEO from "./SEO";

function About() {
	return (
		<>
			<SEO title='עלינו - החנות שלי' description='קרא על מי אנחנו, מה אנחנו עושים ולמה לבחור בנו.' keywords={["אודות", "עלינו", "החנות שלי"]} />
			<div className='container my-5'>
				<div className='row justify-content-center'>
					<div className='col-lg-8'>
						<div className='card shadow border-0 bg-light'>
							<div className='card-body p-5'>
								<h1 className='display-4 text-center mb-4 text-danger fw-bold border-bottom pb-2'>עלינו</h1>
								<p className='mb-4 text-end fs-5 lh-lg'>
									<b>בלאק צ'רי · Black Cherry</b> מגשי אירוח · קייטרינג
									<br />
									קייטרינג ומגשי אירוח בלאק צ'רי הוא קייטרינג המנוהל על ידי שף מוביל בעל ניסיון של 25 שנה. לבלאק צ'רי למעלה מ-400 סוגי מנות ומוצרים המיוצרים בשני מטבחים נפרדים: האחד בשרי כשר והשני חלבי כשר.
								</p>
								<p className='mb-4 text-end fs-5 lh-lg'>
									בנוסף, קונדיטוריה בלאק צ'רי מספקת מנות קינוח ייחודיות, בה כל הפריטים מיוצרים על ידי שף קונדיטור מהמובילים בארץ. אנחנו מספקים שירותי קייטרינג ומגשי אירוח ללקוחות פרטיים ועסקיים. יש לנו מעל ל-150 מנות ומוצרים
									טבעוניים איתן ניתן להרכיב ארוחות טבעוניות שלמות. שירות יעוץ לאירועים – יש לכם אירוע ולא יודעים מה להזמין? רוצים שהאורחים יהנו אבל לא בטוחים מה להזמין ? נוכל לעזור לכם להרכיב את התפריט הייחודי לאירוע שלכם. להצעות
									מחיר ופרטים נוספים: Info@blackcherry.co.il 052-9911184
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
