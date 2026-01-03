import { LoadingScreen } from "@/components/loadingScreen";
import { useUser } from "@/context/userContext";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function SettingsScreen() {
  const { user, setUser, loading } = useUser();

  if (loading) return <LoadingScreen />;

  const [showName, setShowName] = useState(user.showName);
  const [name, setName] = useState(user.name);
  const [showBillions, setShowBillions] = useState(user.showBillions);
  const [billions, setBillions] = useState(user.billions);
  const [currency, setCurrency] = useState(user.currency);

  const currencyOptions = [
    { label: "AUD (A$)", value: "AUD" },
    { label: "CAD (C$)", value: "CAD" },
    { label: "CHF", value: "CHF" },
    { label: "CNY (¥)", value: "CNY" },
    { label: "DKK (kr)", value: "DKK" },
    { label: "EUR (€)", value: "EUR" },
    { label: "GBP (£)", value: "GBP" },
    { label: "HKD", value: "HKD" },
    { label: "INR (₹)", value: "INR" },
    { label: "JPY (¥)", value: "JPY" },
    { label: "KRW (₩)", value: "KRW" },
    { label: "NOK (kr)", value: "NOK" },
    { label: "RUB (₽)", value: "RUB" },
    { label: "SAR (﷼)", value: "SAR" },
    { label: "SEK (kr)", value: "SEK" },
    { label: "SGD (S$)", value: "SGD" },
    { label: "THB (฿)", value: "THB" },
    { label: "USD ($)", value: "USD" },
    { label: "ZAR (R)", value: "ZAR" }
  ];

  // Update context whenever a setting changes
  useEffect(() => {
    if (loading) 
      setUser({
        ...user,
        showName,
        name,
        showBillions,
        billions,
        currency,
      });
  }, [showName, name, showBillions, billions, currency]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy & Identity</Text>

      {/* Section 1 */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Get on the grid</Text>
          <Switch value={showName} onValueChange={setShowName} />
        </View>
        <Text style={styles.subtext}>
          {showName
            ? "You are now on the grid. Your name IS VISIBLE."
            : "You are now off the grid. Your name IS HIDDEN."}
        </Text>
        <TextInput
          placeholder={showName ? "Enter your name" : ""}
          placeholderTextColor="#999"
          style={[styles.input, !showName && styles.disabledInput]}
          value={name}
          onChangeText={setName}
          editable={showName}
        />

        <View style={styles.row}>
          <Text style={styles.label}>Flaunt all your billions</Text>
          <Switch value={showBillions} onValueChange={setShowBillions} />
        </View>
        <Text style={styles.subtext}>
          {showBillions
            ? "I see you are a show-off. Your money IS VISIBLE."
            : "I see you are humble. Your money IS HIDDEN."}
        </Text>

        {/* Money Input + Modern Dark Dropdown */}
        <View style={styles.moneyRow}>
          <View style={[styles.inputWrapper, !showBillions && styles.disabledInput]}>
            <TextInput
              placeholder={showBillions ? "Enter billions" : ""}
              placeholderTextColor="#999"
              style={styles.moneyInputField}
              value={billions}
              onChangeText={(text) => {
                // Sanitize numeric input
                let sanitized = text.replace(/[^0-9.]/g, "");
                const firstDotIndex = sanitized.indexOf(".");
                if (firstDotIndex !== -1) {
                  let integerPart = sanitized.slice(0, firstDotIndex).replace(/^0+(?=\d)/, "");
                  const decimalPart = sanitized.slice(firstDotIndex + 1).replace(/\./g, "");
                  sanitized = decimalPart ? `${integerPart}.${decimalPart}` : integerPart + ".";
                } else {
                  sanitized = sanitized.replace(/^0+(?=\d)/, "");
                }
                setBillions(sanitized);
              }}
              editable={showBillions}
              keyboardType="numeric"
            />
            <Text style={styles.billionSuffix}>b</Text>
          </View>

          <Dropdown
            data={currencyOptions}
            labelField="label"
            valueField="value"
            value={currency}
            onChange={item => setCurrency(item.value)}
            style={[styles.dropdown, !showBillions && styles.disabledPicker]}
            placeholder="CUR"
            placeholderStyle={{ color: "#777" }}
            selectedTextStyle={styles.dropdownText}
            itemTextStyle={styles.dropdownItemText}
            containerStyle={styles.dropdownContainer}
            activeColor="#333"
            disable={!showBillions}
          />
        </View>
      </View>

      {/* Section 2 */}
      <View style={styles.section}>
        <TouchableOpacity>
          <View style={styles.dangerContainer}>
            <Text style={styles.dangerText}>Delete Billionaire Status</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#25292e",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
  },

  section: {
    marginTop: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#333",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  subtext: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 10,
  },

  disabledInput: { opacity: 0.4 },

  moneyRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  moneyInput: {
    flex: 7,
  },

  dropdown: {
    flex: 3,
    height: 48,
    backgroundColor: "#222",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: "#444",
    borderWidth: 1,
  },

  dropdownText: {
    color: "#fff",
    fontSize: 12,
  },

  dropdownItemText: {
    color: "#fff",
    fontSize: 14,
  },

  dropdownContainer: {
    backgroundColor: "#222",
    borderRadius: 10,
    borderColor: "#555",
  },

  disabledPicker: { opacity: 0.4 },

  dangerContainer: {
    backgroundColor: "#B33",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  dangerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  inputWrapper: {
  flex: 7, // 70% width of the row
  position: "relative",
  backgroundColor: "#222",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#444",
  justifyContent: "center",
  height: 48,
  paddingRight: 34, // space for "B"
},

moneyInputField: {
  color: "#fff",
  paddingHorizontal: 12,
  paddingRight: 0, // remove extra padding so "B" fits nicely
  flex: 1,
  fontSize: 16,
},

billionSuffix: {
  position: "absolute",
  right: 12,
  color: "#aaa",
  fontSize: 16,
  fontWeight: "700",
},

});
