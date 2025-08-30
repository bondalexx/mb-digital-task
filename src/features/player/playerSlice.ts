import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  isOpen: boolean;
  currentCourseId: string | null;
  currentTime: number;
  isPlaying: boolean;
  lastCourseId: string | null;
  positions: Record<string, number>;
}

const initialState: PlayerState = {
  isOpen: false,
  currentCourseId: null,
  currentTime: 0,
  isPlaying: false,
  lastCourseId: null,
  positions: {},
};

const slice = createSlice({
  name: "player",
  initialState,
  reducers: {
    openPlayer(
      state,
      action: PayloadAction<{ courseId: string; startTime?: number }>
    ) {
      const { courseId, startTime } = action.payload;
      state.isOpen = true;
      state.currentCourseId = courseId;
      state.lastCourseId = courseId;

      const saved = state.positions[courseId] ?? 0;
      const t = typeof startTime === "number" ? startTime : saved;

      state.currentTime = t;
      state.isPlaying = true;
      state.positions[courseId] = t;
    },
    closePlayer(state) {
      state.isOpen = false;
      state.isPlaying = false;
    },
    setTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
      if (state.currentCourseId) {
        state.positions[state.currentCourseId] = action.payload;
      }
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    hydratePlayer(
      state,
      action: PayloadAction<
        Partial<Pick<PlayerState, "positions" | "lastCourseId">>
      >
    ) {
      state.positions = action.payload.positions ?? state.positions;
      state.lastCourseId = action.payload.lastCourseId ?? state.lastCourseId;
    },
  },
});

export const { openPlayer, closePlayer, setTime, setPlaying, hydratePlayer } =
  slice.actions;
export default slice.reducer;
