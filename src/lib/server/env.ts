import * as dotenv from 'dotenv';
dotenv.config();

function getEnvironmentVariable(environmentVariable: string): string {
	const validEnvironmentVariable = process.env[environmentVariable];
	if (!validEnvironmentVariable) {
		throw new Error(
			`Couldn't find environments variable: ${environmentVariable}`
		);
	}
	return validEnvironmentVariable;
}
