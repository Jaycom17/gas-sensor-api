export class History {
  constructor(
    public readonly id: number,
    public readonly date: string,
    public readonly temperature: number,
    public readonly gas: number,
    public readonly reason: string
  ) {}
}
