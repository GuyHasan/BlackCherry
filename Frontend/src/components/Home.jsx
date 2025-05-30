import CustomerCarousel from "./Customers";
import "../style/Home.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";

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
				<div className='favorite-dishes-container w-75'>
					<h2>האהובים ביותר</h2>
					<p>אנחנו מתגאים בתפריט המגוון והמושקע בארץ, בין המנות האהובות ביותר שלנו ניתן להזמין,</p>
					<div className='d-flex gap-3 justify-content-center'>
						<div className='card'>
							<img src='https://blackcherry.co.il/wp-content/uploads/2019/07/85-1.jpg' className='card-img-top' alt='...' />
							<div className='card-body'>
								<p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							</div>
						</div>
						<div className='card'>
							<img src='https://blackcherry.co.il/wp-content/uploads/2019/07/85-1.jpg' className='card-img-top' alt='...' />
							<div className='card-body'>
								<p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							</div>
						</div>
						<div className='card'>
							<img src='https://blackcherry.co.il/wp-content/uploads/2019/07/85-1.jpg' className='card-img-top' alt='...' />
							<div className='card-body'>
								<p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							</div>
						</div>
						<div className='card'>
							<img src='https://blackcherry.co.il/wp-content/uploads/2019/07/85-1.jpg' className='card-img-top' alt='...' />
							<div className='card-body'>
								<p className='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							</div>
						</div>
					</div>
				</div>
				<div className='customers-container w-100 py-5'>
					<h2 className='mb-3'>לקוחותנו</h2>
					<CustomerCarousel customers={data} />
				</div>
			</div>
		</>
	);
}

export default Home;
