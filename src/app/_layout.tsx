import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";
import { dbMigration } from "../../db/database";
import {
  asyncStoragePersister,
  queryClient,
} from "../../network/tanstackConfig";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <SQLiteProvider databaseName="workout.db" onInit={dbMigration}>
        <ThemeProvider>
          <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </SQLiteProvider>
    </PersistQueryClientProvider>
  );
}
