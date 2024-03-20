type ChatMessage = {
	kind: 'user' | 'bot';
	side: 'left' | 'right';
	content: string;
};
