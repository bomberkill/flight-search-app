import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function SearchSummaryCard({ origin, destination, departureDate, returnDate }: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
}) {
    const { t, i18n } = useTranslation();
  return (
    <ThemedView style={styles.card}>
      <ThemedText style={styles.routeText}>
        ✈️ {origin} → {destination}
      </ThemedText>
      <ThemedText style={styles.dateText}>
        📅 {t('result.labels.departure')} : {format(new Date(departureDate), "d MMMM yyyy")}
      </ThemedText>
      {returnDate && (
        <ThemedText style={styles.dateText}>
          🔁 {t('result.labels.return')} : {format(new Date(returnDate), "d MMMM yyyy")}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#555",

  },
  dateText: {
    fontSize: 12,
    color: "#555",
  },
});
