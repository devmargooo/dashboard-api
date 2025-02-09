import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[Config Service] Не удалось прочесть файл .env');
		} else {
			this.logger.log('Config Service] Конфиг .env загружен');
			this.config = result.parsed!;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
