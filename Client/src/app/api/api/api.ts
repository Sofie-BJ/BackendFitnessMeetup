export * from './meetups.service';
import { MeetupsService } from './meetups.service';
export * from './sports.service';
import { SportsService } from './sports.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [MeetupsService, SportsService, UsersService];
