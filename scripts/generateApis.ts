import * as https from 'https';
import * as fs from 'fs';
import path from 'path';
import { generate } from 'openapi-typescript-codegen';

// Function to download the Swagger JSON
const downloadSwaggerJSON = (url: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		https
			.get(url, (res) => {
				let data = '';
				res.on('data', (chunk) => {
					data += chunk;
				});
				res.on('end', () => {
					try {
						resolve(JSON.parse(data));
					} catch (err) {
						reject(new Error('Invalid JSON response'));
					}
				});
				res.on('error', reject);
			})
			.on('error', reject);
	});
};

// Function to filter the Swagger JSON
const filterSwaggerJSON = (data: any): any => {
	const filteredPaths = Object.keys(data.paths)
		.filter(
			(key) =>
				key.startsWith('/api/') ||
				key === '/' ||
				key.includes('/login') ||
				key.includes('/password')
		)
		.reduce((obj: any, key) => {
			obj[key] = data.paths[key];
			return obj;
		}, {});

	const filteredDefinitions = Object.keys(data.definitions || data.components.schemas)
		.filter((key) => !key.toLowerCase().includes('client'))
		.reduce((obj: any, key) => {
			obj[key] = (data.definitions || data.components.schemas)[key];
			return obj;
		}, {});

	return {
		...data,
		paths: filteredPaths,
		definitions: data.definitions ? filteredDefinitions : undefined,
		components: data.components ? { schemas: filteredDefinitions } : undefined
	};
};

// Function to ensure directory exists
const ensureDirectoryExists = async (dirPath: string): Promise<void> => {
	try {
		await fs.promises.mkdir(dirPath, { recursive: true });
	} catch (error) {
		if ((error as any).code !== 'EEXIST') throw error;
	}
};

const main = async () => {
	const url = 'https://backendasp-development.up.railway.app/swagger/v1/swagger.json';
	const outputPath = path.join(process.cwd(), 'src', 'lib', 'api', 'admin');
	const requestFileSource = path.join(outputPath, 'request.ts');
	const requestFileDestination = path.join(outputPath, 'core', 'request.ts');

	try {
		console.log('Creating necessary directories...');
		await ensureDirectoryExists(outputPath);
		await ensureDirectoryExists(path.join(outputPath, 'core'));

		console.log('Downloading and processing Swagger JSON...');
		const swaggerData = await downloadSwaggerJSON(url);
		const filteredSwagger = filterSwaggerJSON(swaggerData);

		console.log('Generating API client...');
		await generate({
			input: filteredSwagger,
			output: outputPath,
			useOptions: true,
			useUnionTypes: true,
			exportCore: true,
			exportServices: true,
			exportModels: true
		});

		if (fs.existsSync(requestFileSource)) {
			console.log('Copying request file...');
			await fs.promises.copyFile(requestFileSource, requestFileDestination);
		}

		console.log('API client generation completed successfully.');
	} catch (error) {
		console.error('Failed to generate API client:', error);
		process.exit(1);
	}
};

main();
