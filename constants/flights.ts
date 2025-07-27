import { FlightItinerary } from "@/app/(tabs)/explore/result";

export const staticFlights: FlightItinerary[] = [
  {
    id: "13771-2507272210--31171,-30769-2-12712-2507281220",
    price: { formatted: "$1,194" },
    legs: [
      {
        id: "13771-2507272210--31171,-30769-2-12712-2507281220",
        durationInMinutes: 1150,
        stopCount: 2,
        departure: "2025-07-27T22:10:00",
        arrival: "2025-07-28T12:20:00",
        origin: { name: "London Luton", displayCode: "LTN" },
        destination: { name: "New York JFK", displayCode: "JFK" },
        carriers: {
          marketing: [
            { name: "FLYONE", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/52.png" },
            { name: "HiSky Europe", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/4H.png" }
          ]
        }
      }
    ]
  },
  {
    id: "13542-2507272145--31685,-31915,-32032-2-12712-2507281450",
    price: { formatted: "$941" },
    legs: [
      {
        id: "13542-2507272145--31685,-31915,-32032-2-12712-2507281450",
        durationInMinutes: 1325,
        stopCount: 2,
        departure: "2025-07-27T21:45:00",
        arrival: "2025-07-28T14:50:00",
        origin: { name: "London Gatwick", displayCode: "LGW" },
        destination: { name: "New York JFK", displayCode: "JFK" },
        carriers: {
          marketing: [
            { name: "Vueling Airlines", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/07.png" },
            { name: "Ryanair", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/FR.png" },
            { name: "Neos Air", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/NO.png" }
          ]
        }
      }
    ]
  },
  {
    id: "13554-2507272125--32217-1-11442-2507281910",
    price: { formatted: "$1,114" },
    legs: [
      {
        id: "13554-2507272125--32217-1-11442-2507281910",
        durationInMinutes: 1605,
        stopCount: 1,
        departure: "2025-07-27T21:25:00",
        arrival: "2025-07-28T19:10:00",
        origin: { name: "London Heathrow", displayCode: "LHR" },
        destination: { name: "New York Newark", displayCode: "EWR" },
        carriers: {
          marketing: [
            { name: "Icelandair", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/FI.png" }
          ]
        }
      }
    ]
  },
  {
    id: "13542-2507272145--31685,-32356,-32032-2-12712-2507281450",
    price: { formatted: "$980" },
    legs: [
      {
        id: "13542-2507272145--31685,-32356,-32032-2-12712-2507281450",
        durationInMinutes: 1325,
        stopCount: 2,
        departure: "2025-07-27T21:45:00",
        arrival: "2025-07-28T14:50:00",
        origin: { name: "London Gatwick", displayCode: "LGW" },
        destination: { name: "New York JFK", displayCode: "JFK" },
        carriers: {
          marketing: [
            { name: "Vueling Airlines", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/07.png" },
            { name: "easyJet", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/EZ.png" },
            { name: "Neos Air", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/NO.png" }
          ]
        }
      }
    ]
  },
  {
    id: "13554-2507272225--31734-1-12712-2507281055",
    price: { formatted: "$2,166" },
    legs: [
      {
        id: "13554-2507272225--31734-1-12712-2507281055",
        durationInMinutes: 1050,
        stopCount: 1,
        departure: "2025-07-27T22:25:00",
        arrival: "2025-07-28T10:55:00",
        origin: { name: "London Heathrow", displayCode: "LHR" },
        destination: { name: "New York JFK", displayCode: "JFK" },
        carriers: {
          marketing: [
            { name: "Turkish Airlines", logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/TK.png" }
          ]
        }
      }
    ]
  }
];

