import { Helmet } from "react-helmet-async";

function SEO({ title, description, keywords = [], image, type = "website" }) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			{keywords.length > 0 && <meta name='keywords' content={keywords.join(", ")} />}
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			{image && <meta property='og:image' content={image} />}
			<meta property='og:type' content={type} />
		</Helmet>
	);
}

export default SEO;
