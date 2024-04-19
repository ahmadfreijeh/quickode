import {
  UserRepository,
  AppRepository,
  AuthRepository,
  NotificationRepository,
} from './user';

// import {AuthRepository as User2AuthRepository} from './user_2';

const repositories = {
  user: UserRepository,
  auth: AuthRepository,
  app: AppRepository,
  notification: NotificationRepository,

  //   user_2_auth: User2AuthRepository,
};

export const RepositoryFactory = {
  get: (name: string | number) => repositories[name],
};
