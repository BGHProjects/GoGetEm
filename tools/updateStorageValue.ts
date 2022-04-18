import { Data } from "../constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateStorageValue = async (dataKey: Data, increment: number) => {
  try {
    let valueToUpdate = await AsyncStorage.getItem(dataKey);
    if (dataKey !== null) {
      // TODO Probably need to confirm that valueToUpdate is a number, and valid
      await AsyncStorage.setItem(
        dataKey,
        (Number(valueToUpdate) + increment).toString()
      );
    }
  } catch (err) {
    console.log("err", err);
  }
};
