import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserToken = async (token: string) => {
    try {
      await AsyncStorage.setItem(
        'Token',
        token
      );
    } catch (error) {
      throw(error);
    }
}

export const getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem('Token');
      if (value !== null) {
        return(value);
      }
    } catch (error) {
      throw(error);
    }
}
