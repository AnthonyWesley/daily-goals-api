export interface IUser {
  ip: string;
}

export class User {
  private constructor(readonly props: IUser) {}

  static build(ip: string) {
    return new User({ ip: ip });
  }

  public get ip() {
    return this.props.ip;
  }
}
