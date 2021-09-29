export class AlertError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AlertError";
  }
}
