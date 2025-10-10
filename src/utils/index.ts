import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export { hp, wp };

export const capitalizeFirstLetter = (str: string) => {
  if (str && typeof str == "string")
    return `${str[0].toUpperCase()}${str.slice(1)}`;
};
