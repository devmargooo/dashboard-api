import { PrismaClient } from '.prisma/client';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Успешно подключили БД');
		} catch (e: any) {
			this.logger.error('PrismaService]  Ошибка подключения к БД: ' + e.message);
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
