import { WeekDays } from "../../constants/Date/DateConstantes";

export abstract class DateTimeService {
  public static DAILY_MILLISECONDS = 24 * 60 * 60 * 1000;

  public static getDateNDaysAgo(numberOfDaysAgo: number): Date {
    const NB_DAYS_AGO_IN_MILLISECONDS =
      DateTimeService.DAILY_MILLISECONDS * numberOfDaysAgo;
    return new Date(+new Date() - NB_DAYS_AGO_IN_MILLISECONDS);
  }

  public static getPastWeekDates(): { day: WeekDays; date: Date }[] {
    const currentWeekDates: { day: WeekDays; date: Date }[] = [];
    for (let n = 0; n < 7; n++) {
      currentWeekDates.push({
        day: DateTimeService.getDateNDaysAgo(n).getDay(),
        date: DateTimeService.getDateNDaysAgo(n),
      });
    }

    return currentWeekDates.sort((a, b) => +a.date - +b.date);
  }
}
