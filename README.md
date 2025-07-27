# ✈️ Flight Search App

A mobile application for searching flights between two destinations, with departure/return dates, passenger counts, and travel class options. Built with **React Native** using **Expo**, `expo-router`, `Formik`, `i18next`, and flight APIs for location suggestions and result listings.

## 📱 Features Overview

- 📍 Dynamic location input with autocomplete
- 📅 Departure and return date pickers
- 👥 Passenger selector (adults, children, infants)
- 🧳 Travel class selector (economy, business, etc.)
- 🔎 Result listing with flight details
- 🌐 Internationalization support with `i18next`

---

## 🛠️ Tech Stack

- **React Native** (via [Expo](https://expo.dev/))
- **expo-router** for routing/navigation
- **Formik + Yup** for form management and validation
- **React Native Dropdown Picker** for custom dropdowns
- **i18next** for multilingual support
- **Axios** for HTTP requests
- **TypeScript** for static typing
- **Skyscanner API** (or similar) for locations and flight data

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18.x)
- Yarn or npm
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
git clone https://github.com/bomberkill/flight-search-app.git
cd explore-flights-app
npm install
