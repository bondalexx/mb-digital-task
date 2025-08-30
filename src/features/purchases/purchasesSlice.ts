import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { handlePurchase } from "../../api/courses";
import type { RootState } from "../../store";

type Status = "idle" | "processing" | "succeeded" | "failed";

interface PurchasesState {
  purchasedIds: string[];
  loading: boolean;
  error?: string;
  statusByCourse: Record<string, Status>;
}

const initialState: PurchasesState = {
  purchasedIds: [],
  loading: false,
  error: undefined,
  statusByCourse: {},
};

export const purchaseCourse = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("purchases/buy", async (courseId) => {
  const res = await handlePurchase(courseId);
  if (!res.success) throw new Error(res.error || "Помилка оплати");
  return courseId;
});

const slice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    hydratePurchases(state, action: PayloadAction<string[]>) {
      state.purchasedIds = action.payload;
      state.statusByCourse = {};
      state.loading = false;
      state.error = undefined;
    },
    resetPurchases() {
      return initialState;
    },
  },
  extraReducers: (b) => {
    b.addCase(purchaseCourse.pending, (s, a) => {
      const courseId = a.meta.arg;
      s.loading = true;
      s.error = undefined;
      s.statusByCourse[courseId] = "processing";
    });
    b.addCase(purchaseCourse.fulfilled, (s, a) => {
      const courseId = a.payload;
      s.loading = false;
      s.statusByCourse[courseId] = "succeeded";
      if (!s.purchasedIds.includes(courseId)) s.purchasedIds.push(courseId);
    });
    b.addCase(purchaseCourse.rejected, (s, a) => {
      const courseId = a.meta.arg;
      s.loading = false;
      s.error = a.error.message;
      s.statusByCourse[courseId] = "failed";
    });
  },
});

export default slice.reducer;

export const { hydratePurchases, resetPurchases } = slice.actions;

export const selectIsPurchased = (courseId: string) => (s: RootState) =>
  s.purchases.purchasedIds.includes(courseId);

export const selectPurchaseStatus = (courseId: string) => (s: RootState) =>
  s.purchases.statusByCourse?.[courseId] ?? "idle";

export const selectOwnedCount = (s: RootState) =>
  s.purchases.purchasedIds.length;
