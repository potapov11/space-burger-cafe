export const TestError = () => {
	return (
		<button
			onClick={() => {
				throw new Error('This is your first error!');
			}}>
			Break the world
		</button>
	);
};
