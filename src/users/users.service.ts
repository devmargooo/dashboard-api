import { injectable, inject } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUsersService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersRepository) private userRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const user = new User(email, name);
		const salt = Number(this.configService.get('SALT'));
		await user.setPassword(password, salt);
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		}
		return await this.userRepository.create(user);
	}

	validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		return Promise.resolve(true);
	}
}
