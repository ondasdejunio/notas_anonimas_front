import moment from "moment";

export const getUserAgeFromNow = (dateBirth) => {
  const dateNow = moment(new Date());
  return dateNow.diff(dateBirth, "years");
};

export const getUserGenderLetter = (gender) => {
  return gender.charAt(0);
};

export const userGenderColors = {
  MASCULINO: {
    headerBgColor: "linear(blue.50 0%, blue.200 90%)",
    contentBgColor: "blue.50",
    commentBgColor: "#F7FDFF",
    color: "blue.800",
  },

  FEMENINO: {
    headerBgColor: "linear(pink.50 0%, pink.200 90%)",
    contentBgColor: "pink.50",
    commentBgColor: "#FFFCFD",
    color: "pink.800",
  },
  OTRO: {
    headerBgColor: "linear(secondary.300 0%, secondary.500 90%)",
    contentBgColor: "secondary.100",
    commentBgColor: "secondary.50",
    color: "secondary.800",
  },
};

export const getCardDescriptionFontSize = (text) => {
  const length = text.length;
  if (length <= 150) {
    return { base: "18px", md: "20px", lg: "24px" };
  } else if (length <= 300) {
    return { base: "16px", md: "16px", lg: "18px" };
  } else {
    return { base: "14px", md: "16px", lg: "17px" };
  }
};
