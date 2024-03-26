import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";
import StackNavigator from "./navigation/StackNavigator";
import store from "./store";
import { UserContext } from "./UserContext";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from './theme/theme';
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <>
     <Provider store={store}>
        <UserContext>
          <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.CartItemLinearGradient}
          >
          <StackNavigator />
          <ModalPortal />
          </LinearGradient>
        </UserContext>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  CartItemLinearGradient: {
    flex: 1,
    // gap: SPACING.space_12,
    // padding: SPACING.space_12,
    // borderRadius: BORDERRADIUS.radius_25,
  },
});
