import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Mock data generator
const generatePeople = (count: number) => {
  const currencies = ["USD", "EUR", "JPY", "GBP", "CHF", "AUD", "CNY"];
  const people = [];
  for (let i = 1; i <= count; i++) {
    const showName = Math.random() > 0.3; // 70% show name
    const name = showName ? `Billionaire ${i}` : "";
    const billions = (Math.random() * 100).toFixed(2); // 0–100 billions
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    people.push({ id: i, name, billions, currency });
  }
  return people;
};

const allPeople = generatePeople(137); // mock 137 people

export default function PeopleScreen() {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const pageData = allPeople.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allPeople.length / pageSize);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All the Billionaires</Text>

      {/* Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.idCell]}>ID</Text>
        <Text style={[styles.cell, styles.nameCell]}>Name</Text>
        <Text style={[styles.cell, styles.moneyCell]}>Networth</Text>
      </View>

      {/* List */}
      <FlatList
        data={pageData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.idCell]}>{item.id}</Text>
            <Text style={[styles.cell, styles.nameCell]}>
              {item.name || "?"}
            </Text>
            <Text style={[styles.cell, styles.moneyCell]}>
              {item.currency} {item.billions}b
            </Text>
          </View>
        )}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={page <= 1}
          onPress={() => setPage(page - 1)}
          style={[styles.pageButton, page <= 1 && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.pageInfo}>
          Page {page} of {totalPages}
        </Text>

        <TouchableOpacity
          disabled={page >= totalPages}
          onPress={() => setPage(page + 1)}
          style={[styles.pageButton, page >= totalPages && styles.disabledButton]}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#25292e" },
  title: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 12 },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  headerRow: { backgroundColor: "#333" },
  cell: { color: "#fff", fontSize: 16 },
  idCell: { flex: 1, fontWeight: "600" },
  nameCell: { flex: 4 },
  moneyCell: { flex: 3, textAlign: "right" },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#4A8",
    borderRadius: 8,
  },
  disabledButton: { backgroundColor: "#555" },
  pageButtonText: { color: "#fff", fontWeight: "600" },
  pageInfo: { color: "#aaa", fontSize: 16 },
});
