import "../style/Home.css";
import SEO from "./SEO";

function Home() {
	const data = [
		{ id: 1, color: "red" },
		{ id: 2, color: "blue" },
		{ id: 3, color: "green" },
		{ id: 4, color: "yellow" },
		{ id: 5, color: "purple" },
		{ id: 6, color: "orange" },
		{ id: 7, color: "pink" },
		{ id: 8, color: "brown" },
		{ id: 9, color: "black" },
		{ id: 10, color: "white" },
	];
	return (
		<>
			<SEO title='BlackCherry - בית' description='ברוכים הבאים לבלק צ׳רי, קייטרינג ומגשי אירוח כשרים' keywords={["קייטרינג, מגשי אירוח, כשר, בלק צ׳רי"]} />
			<div className='d-flex flex-column justify-content-center align-items-center w-100'>
				<div className='home-header'>
					<img src='/homePhoto.jpg' alt='' className='home-photo' />
					<div className='home-circle'>
						<img src='/Cherry.svg' alt='' className='cherry-svg' />
						<h4 className='home-circle-text'>
							קייטרינג <br />
							ומגשי אירוח
						</h4>
					</div>
				</div>
				<div className='d-flex flex-column align-items-center home-text-container'>
					<p className='home-text mb-0'>
						קייטרינג ומגשי אירוח בלאק צ'רי הוא קייטרינג המנוהל על ידי שף מוביל בעל ניסיון של 25 שנה. לבלאק צ'רי למעלה מ400 סוגי מנות ומוצרים המיוצרים בשני מטבחים נפרדים: האחד בשרי כשר והשני חלבי כשר. בנוסף, קונדיטוריית בלאק צ'רי מספקת
						מנות קינוח ייחודיות, בה כל הפריטים מיוצרים על ידי שף קונדיטור מהמובילים בארץ.
					</p>
				</div>
			</div>
		</>
	);
}

export default Home;
