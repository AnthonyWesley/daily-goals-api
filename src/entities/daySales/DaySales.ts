import { ulid } from "ulid";

export interface IDaySales {
  id: string;
  day: Date;
  sales: number;

  goalId: string;
}

export class DaySales {
  private constructor(readonly props: IDaySales) {}

  static build(day: Date, sales: number, goalId: string) {
    return new DaySales({
      id: ulid(),
      day,
      sales,
      goalId,
    });
  }

  public get id() {
    return this.props.id;
  }

  public get day() {
    return this.props.day;
  }

  public get sales() {
    return this.props.sales;
  }

  public get goalId() {
    return this.props.goalId;
  }
}
