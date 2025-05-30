// שמות קטגוריות בעברית ואנגלית, כולל תתי קטגוריות

export const categories = [
	{
		key: "meat",
		he: "בשרי",
		subCategories: [],
	},
	{
		key: "dairy",
		he: "חלבי",
	},
	{
		key: "desserts",
		he: "קינוחים",
		subCategories: [
			{ key: "dairy", he: "חלבי" },
			{ key: "parve", he: "פרווה" },
			{ key: "vegan", he: "טבעוני" },
		],
	},
	{
		key: "platters",
		he: "מגשים",
		subCategories: [],
	},
	{
		key: "salads",
		he: "סלטים",
		subCategories: [],
	},
	{
		key: "sides",
		he: "תוספות",
		subCategories: [],
	},
	{
		key: "vegan",
		he: "טבעוני",
		subCategories: [],
	},
];
