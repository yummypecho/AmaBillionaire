import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { generatePeople } from "../../utils/mockBillionaires";
import { loadUserSettings, saveUserSettings } from "../../utils/userSettings";

export default function PeopleScreen() {
  const [user, setUser] = useState<any>({
    id: -1,
    name: "",
    showName: false,
    billions: "0",
    showBillions: false,
    currency: "USD",
  });

  useEffect(() => {
    loadUserSettings().then((data) => {
      if (data) setUser(data);
    });
  }, []);

  const [people, setPeople] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const init = async () => {
      // all users
      setPeople(generatePeople());

      // this user
      const savedUser = await loadUserSettings();
      let currentUser = savedUser;
      if (!savedUser || savedUser.id < 0 || savedUser.id == undefined) {
        const randId = Math.floor(Math.random() * 67) + 1;
        currentUser = {
          id: randId,
          name: "",
          showName: false,
          billions: "0",
          showBillions: false,
          currency: "USD",
        };
        await saveUserSettings(currentUser);
      }
      setUser(currentUser);

      setPeople(prev => {
        const newPeople = [...prev];
        newPeople[currentUser.id-1] = {
          ...newPeople[currentUser.id-1],
          id: currentUser.id,
          name: currentUser.name,
          showName: currentUser.showName,
          billions: currentUser.billions,
          showMoney: currentUser.showBillions,
          currency: currentUser.currency,
        };
        return newPeople;
      })
    };

    init();
  }, []);

  useEffect(() => {
    if (user.id === -1 || people.length === 0) return;

    setPeople(prev => {
      const newPeople = [...prev];
      const index = user.id - 1; // zero-based
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
  }, [user]); // <-- runs whenever user state changes

  const totalPages = Math.ceil(people.length / pageSize);
  const pageData = people.slice((page - 1) * pageSize, page * pageSize);

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
        renderItem={({ item }) => {
            const isUser = item.id === user.id;
            console.log(user.id, item.id, isUser);
            
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
            )
          }
        }
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
  
  userRow: {
    backgroundColor: "#4A8", // blue highlight
    borderRadius: 8,
  },
  userText: {
    fontWeight: "700",
    color: "#fff",
  },

});
