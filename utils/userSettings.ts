import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "user_settings";

export const saveUserSettings = async (data: any) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
  } catch (e) {
    console.log("Error saving user settings", e);
  }
};

export const loadUserSettings = async () => {
  try {
    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.log("Error loading user settings", e);
    return null;
  }
};
