import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import coursesReducer from "../features/courses/coursesSlice";
import playerReducer from "../features/player/playerSlice";
import purchasesReducer, {
  hydratePurchases,
  resetPurchases,
} from "../features/purchases/purchasesSlice";
import { load, save } from "../utils/persist";
import type { User } from "../types";

const preloadedUser = load<User>("ocp_user");
const keyForPurchases = (email: string) => `ocp_purchases_${email}`;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    player: playerReducer,
    purchases: purchasesReducer,
  },
  preloadedState: {
    auth: { user: preloadedUser ?? null, loading: false, error: undefined },
    purchases: {
      purchasedIds: [] as string[],
      loading: false,
      error: undefined,
      statusByCourse: {},
    },
  } as const,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const currentUser = store.getState().auth.user;
if (currentUser?.email) {
  const data = load<{ purchasedIds: string[] }>(
    keyForPurchases(currentUser.email)
  );
  store.dispatch(hydratePurchases(data?.purchasedIds ?? []));
}

let lastEmail: string | null = currentUser?.email ?? null;
let lastPurchasesJson = "";

store.subscribe(() => {
  const state = store.getState();
  const email = state.auth.user?.email ?? null;

  if (email !== lastEmail) {
    lastEmail = email;

    if (email) {
      const data = load<{ purchasedIds: string[] }>(keyForPurchases(email));
      store.dispatch(hydratePurchases(data?.purchasedIds ?? []));
    } else {
      store.dispatch(resetPurchases());
    }
    lastPurchasesJson = "";
  }

  if (email) {
    const payload = { purchasedIds: state.purchases.purchasedIds };
    const json = JSON.stringify(payload);
    if (json !== lastPurchasesJson) {
      save(keyForPurchases(email), payload);
      lastPurchasesJson = json;
    }
  }
});
