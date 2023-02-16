import moment from "moment";

export const getPluralChar = (duration, type) =>
  duration === 0 || duration > 1 ? (type === "month" ? "es" : "s") : "";

export const getStringTimeFromNow = (date) => {
  const momentDate = moment(date, "YYYY-MM-DD HH:mm:ss");
  const diff = moment().diff(momentDate);
  const duration = moment.duration(diff);

  if (duration.years() > 0) {
    return `hace ${duration.years()} año${getPluralChar(duration.years())}`;
  } else if (duration.months() > 0) {
    return `hace ${duration.months()} mes${getPluralChar(
      duration.months(),
      "month"
    )}`;
  } else if (duration.weeks() > 0) {
    return `hace ${duration.weeks()} semana${getPluralChar(duration.weeks())}`;
  } else if (duration.days() > 0) {
    return `hace ${duration.days()} día${getPluralChar(duration.days())}`;
  } else if (duration.hours() > 0) {
    return `hace ${duration.hours()} hora${getPluralChar(duration.hours())}`;
  } else if (duration.minutes() > 0) {
    return `hace ${duration.minutes()} minuto${getPluralChar(
      duration.minutes()
    )}`;
  } else {
    return `hace ${duration.seconds()} segundo${getPluralChar(
      duration.seconds()
    )}`;
  }
};
