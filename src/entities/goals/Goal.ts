import { ulid } from "ulid";

export interface DaySales {
  day: Date;
  sales: number;
}

export interface IGoal {
  id: string;
  name: string;
  monthlyGoal: number;
  workingDays: number;
  userIp: string;
  // daySales?: DaySales[];
}

export class Goal {
  private constructor(readonly props: IGoal) {}

  static build(
    // id: string,
    name: string,
    monthlyGoal: number,
    workingDays: number,
    userIp: string
  ) {
    return new Goal({
      id: ulid(),
      name,
      monthlyGoal,
      workingDays,
      userIp,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get monthlyGoal() {
    return this.props.monthlyGoal;
  }

  public get workingDays() {
    return this.props.workingDays;
  }

  public get userIp() {
    return this.props.userIp;
  }
}
