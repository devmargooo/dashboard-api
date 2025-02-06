import { injectable, inject } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserService implements IUsersService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const user = new User(email, name);
		const salt = Number(this.configService.get('SALT'));
		await user.setPassword(password, salt);
		return user;
	}

	validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		return Promise.resolve(true);
	}
}
