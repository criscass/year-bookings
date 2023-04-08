import type { RequestHandler } from './$types';

type Data = {
	success: boolean;
	errors: Record<string, string>;
};

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
};
