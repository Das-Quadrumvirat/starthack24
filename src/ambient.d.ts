type ChatMessage = {
	kind: 'user' | 'bot';
	side: 'left' | 'right';
	content: string;
};

type Result = {
	dates: string[];
	data: Data;
}

type Data = {
	id: string;
	name: string;
	shortName: string;
	compliance: 0 | 1 | 2 | 3;
	sustainability: number;
	environment: number;
	social: number;
	prices: number[];
};
