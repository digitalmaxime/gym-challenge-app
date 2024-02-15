import { WeekDays } from "../../constants/Date/DateConstants";

export abstract class DateTimeService {
  public static DAILY_MILLISECONDS = 24 * 60 * 60 * 1000;

  public static getDateNDaysAgo(numberOfDaysAgo: number): Date {
    const NB_DAYS_AGO_IN_MILLISECONDS =
      DateTimeService.DAILY_MILLISECONDS * numberOfDaysAgo;
    return new Date(+new Date() - NB_DAYS_AGO_IN_MILLISECONDS);
  }

  public static getPastWeekDates(): { day: WeekDays; date: Date }[] {
    const pastWeekDates: { day: WeekDays; date: Date }[] = [];
    for (let n = 0; n < 7; n++) {
      const date = DateTimeService.getDateNDaysAgo(n);

      pastWeekDates.push({
        day: date.getDay(),
        date: date,
      });
    }

    return pastWeekDates.sort((a, b) => +a.date - +b.date);
  }

  public static getPastMonthDates(): { day: number; date: Date }[] {
    const currentMonthDates: { day: number; date: Date }[] = [];
    const currentMonth = new Date().getMonth()
    for (let n = 0; n < 31; n++) {
      const date = DateTimeService.getDateNDaysAgo(n);
      if (date.getMonth() == currentMonth) {
        currentMonthDates.push({
          day: date.getDate(),
          date: date,
        });
      }
    }

    return currentMonthDates.sort((a, b) => +a.date - +b.date);
  }
}
