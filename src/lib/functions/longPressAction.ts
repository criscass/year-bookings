export function longpress(node: any, threshold = 500) {
	const handleMousedown = () => {
		let start = Date.now();

		const timeout = setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, threshold);

		const cancel = () => {
			clearTimeout(timeout);
			node.removeEventListener('mousemove', cancel);
			node.removeEventListener('mouseup', cancel);
		};

		node.addEventListener('mousemove', cancel);
		node.addEventListener('mouseup', cancel);
	};

	node.addEventListener('mousedown', handleMousedown);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown);
		}
	};
}
