import { LoadingScreen } from "@/components/loadingScreen";
import { useUser } from "@/context/userContext";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { generatePeople } from "../../utils/mockBillionaires";

export default function PeopleScreen() {
  const { user, setUser, loading } = useUser();
  const [people, setPeople] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Generate mock people once
  useEffect(() => {
    const allPeople = generatePeople();
    // insert user at correct index
    if (user.id >= 0) {
      allPeople[user.id - 1] = {
        ...allPeople[user.id - 1],
        id: user.id,
        name: user.name,
        showName: user.showName,
        billions: user.billions,
        showMoney: user.showBillions,
        currency: user.currency,
      };
    }
    setPeople(allPeople);
  }, []); // run once on mount

  // Init or update the user entry whenever user state changes
  useEffect(() => {
    if (loading) return; // wait until user is loaded

    if (user.id < 0 || user.id === undefined) {
      const newId = Math.floor(Math.random() * 67) + 1;
      setUser({...user, id: newId });
    }
    console.log("User id is " + user.id);

    setPeople(prev => {
      const newPeople = [...prev];
      const index = user.id - 1;
      newPeople[index] = {
        ...newPeople[index],
        id: user.id,
        name: user.showName ? user.name : "?",
        showName: user.showName,
        billions: user.showBillions ? user.billions : "?",
        showMoney: user.showBillions,
        currency: user.showBillions ? user.currency : "?",
      };
      return newPeople;
    });
  }, [user]); // <-- reacts to context changes

  const totalPages = Math.ceil(people.length / pageSize);
  const pageData = people.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <LoadingScreen />;
  else 
    return (
      <View style={styles.container}>
        <Text style={styles.title}>All the Billionaires</Text>

        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.idCell]}>ID</Text>
          <Text style={[styles.cell, styles.nameCell]}>Name</Text>
          <Text style={[styles.cell, styles.moneyCell]}>Networth</Text>
        </View>

        <FlatList
          data={pageData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const isUser = item.id === user.id;
            return (
              <View style={[styles.row, isUser && styles.userRow]}>
                <Text style={[styles.cell, styles.idCell, isUser && styles.userText]}>{item.id}</Text>
                <Text style={[styles.cell, styles.nameCell, isUser && styles.userText]}>
                  {item.showName ? item.name : "?"}
                </Text>
                <Text style={[styles.cell, styles.moneyCell, isUser && styles.userText]}>
                  {item.showMoney ? `${item.currency} ${item.billions}b` : "?"}
                </Text>
              </View>
            );
          }}
        />

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
  row: { flexDirection: "row", paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: "#444" },
  headerRow: { backgroundColor: "#333" },
  cell: { color: "#fff", fontSize: 16 },
  idCell: { flex: 1, fontWeight: "600" },
  nameCell: { flex: 4 },
  moneyCell: { flex: 3, textAlign: "right" },
  pagination: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  pageButton: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: "#4A8", borderRadius: 8 },
  disabledButton: { backgroundColor: "#555" },
  pageButtonText: { color: "#fff", fontWeight: "600" },
  pageInfo: { color: "#aaa", fontSize: 16 },
  userRow: { backgroundColor: "#4A8", borderRadius: 8 },
  userText: { fontWeight: "700", color: "#fff" },
});
