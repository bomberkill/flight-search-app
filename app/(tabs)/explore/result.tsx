import SearchSummaryCard from "@/components/SearchSummaryCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { staticFlights } from "@/constants/flights";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { SearchParams } from "./search";

export interface FlightItinerary {
  id: string;
  price: { formatted: string };
  legs: {
    id: string;
    durationInMinutes: number;
    stopCount: number;
    departure: string;
    arrival: string;
    origin: { name: string; displayCode: string };
    destination: { name: string; displayCode: string };
    carriers: { marketing: { name: string; logoUrl: string }[] };
  }[];
}

export default function ResultScreen() {
    const { t } = useTranslation();
    const colorScheme = useColorScheme();
    const params = useLocalSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [flights, setFlights] = useState<FlightItinerary[]>([]);

    const searchParams: SearchParams = {
        origin: {
            skyId: params.originSkyId as string,
            entityId: params.originEntityId as string,
            title: params.originTitle as string,
        },
        destination: {
            skyId: params.destinationSkyId as string,
            entityId: params.destinationEntityId as string,
            title: params.destinationTitle as string,
        },
        departureDate: params.departureDate as string,
        returnDate: params.returnDate as string,
        adults: parseInt(params.adults as string, 10),
        children: parseInt(params.children as string, 10),
        infants: parseInt(params.infants as string, 10),
        travelClass: params.travelClass as string,
   };
    useEffect(() => {
        const fetchFlights = async () => {
            const options = {
                method: 'GET',
                url: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights',
                params: {
                    originSkyId: searchParams.origin.skyId,
                    destinationSkyId: searchParams.destination.skyId,
                    originEntityId: searchParams.origin.entityId,
                    destinationEntityId: searchParams.destination.entityId,
                    date: searchParams.departureDate,
                    returnDate: searchParams.returnDate,
                    infants: searchParams.infants,
                    childrens: searchParams.children,
                    cabinClass: searchParams.travelClass,
                    adults: searchParams.adults,
                    sortBy: 'best',
                    currency: 'USD',
                    market: 'en-US',
                    countryCode: 'US'
                },
                headers: {
                    // 'x-rapidapi-key': '50ec0d30e9msh85911ae251caf57p13b8c6jsn6ec37ae9c238',
                    'x-rapidapi-key': 'c80a8aa0a3msh7524a0bb70dbec8p1b5316jsn0aa1fad9d04c',
                    'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
                }
                };
            setIsLoading(true);
            try {
                // Simulate an API call
                const response = await axios.request(options);
	            // console.log(response.data);
                console.log('Flights fetched:', response.data);
                setFlights(response.data.itineraries || []);
            } catch (error: any) {
                Toast.show({
                    type: 'error',
                    text1: t('message.error'),
                    text2: error.message || t('result.fetchError'),

                });
                console.error('Error fetching flights:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchFlights();
    }, [])

    const renderItem = ({ item }: { item: FlightItinerary }) => {
  const leg = item.legs[0];
  const carrier = leg.carriers.marketing[0];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: carrier.logoUrl }} style={styles.logo} />
        <ThemedText style={styles.carrierName}>{carrier.name}</ThemedText>
      </View>

      <ThemedText style={styles.route}>
        {leg.origin.displayCode} → {leg.destination.displayCode}
      </ThemedText>

      <View style={styles.rowBetween}>
        <ThemedText style={styles.label}>{t('result.duration')}</ThemedText>
        <ThemedText style={styles.value}>
          {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}min
        </ThemedText>
      </View>

      <View style={styles.rowBetween}>
        <ThemedText style={styles.label}>{t('result.price')}</ThemedText>
        <ThemedText style={styles.value}>{item.price.formatted}</ThemedText>
      </View>

      <View style={styles.rowBetween}>
        <ThemedText style={styles.label}>{t('result.stops')}</ThemedText>
        <ThemedText style={styles.value}>{leg.stopCount}</ThemedText>
      </View>
    </View>
  );
};


    
    return (
        <ThemedView style={styles.container}>
            <SearchSummaryCard
                origin={searchParams.origin.title}
                destination={searchParams.destination.title}
                departureDate={searchParams.departureDate}
                returnDate={searchParams.returnDate}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
            ) : (
                <FlatList
                // data={flights}
                data={flights.length > 0 ? flights : staticFlights}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<ThemedText style={styles.notFound}>{t('result.noFlightsFound')}</ThemedText>}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  notFound: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
  carrierName: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  route: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
    color: '#333',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#666',
    fontWeight: '500',
  },
  value: {
    color: '#000',
    fontWeight: '600',
  },
});