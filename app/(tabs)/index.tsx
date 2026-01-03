import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  let countText = `So what? Here's more like you.`;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        You don't need me to say this. You're a f*cking billionaire.
      </Text>

      <TouchableOpacity style={styles.button}>
        <Link href="/people" style={styles.buttonLink}>
          {countText}
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#25292e", // match settings dark background
  },

  headerText: {
    fontSize: 28,
    color: "#fff",           // white text
    marginBottom: 30,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#333",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Android shadow
    marginBottom: 50,
  },


  buttonLink: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});
