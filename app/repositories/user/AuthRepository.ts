import Repository from '../Repository';

const source = '/auth';

export default {
  login(data: {email: any; password: any}) {
    let body = {
      email: data.email,
      password: data.password,
    };
    return Repository.post(`${source}/login`, body);
  },
  logout(data: any) {
    return Repository.post(`${source}/logout`, data);
  },
};
