export class Timer {
  static hasTenMinutesPassed(date1: Date, date2: Date): boolean {
    const differenceInMs = Math.abs(date1.getTime() - date2.getTime());

    const differenceInMinutes = differenceInMs / (1000 * 60);

    return differenceInMinutes >= 10;
  }
}
