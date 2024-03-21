type ChatMessage = {
	kind: 'user' | 'bot';
	side: 'left' | 'right';
	content: string;
};

type Asset = {
	id: string;
	name: string;
	price: number;
	compliance: 0 | 1 | 2 | 3;
};
