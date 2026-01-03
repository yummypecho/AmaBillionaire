import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const userCount_temp = 0;
  
  let countText = userCount_temp > 1 ? 
    "So what? There's like {countText} of you." : 
    "So what? There's like... 1 of you. WTF you're the only one!?";

  return (
    <View 
      style={styles.container}>
      <Text style={styles.text}>
        You don't need me to say this. You're a f*cking billionaire.
      </Text>
      <Link href="/people" style={styles.button}>
        {countText}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    textAlign: "left",
    marginBottom: 40,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    alignSelf: "flex-start",
  }
});