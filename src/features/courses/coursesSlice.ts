import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCourses } from "../../api/courses";
import type { Course } from "../../types";

interface CoursesState {
  items: Course[];
  loading: boolean;
  error?: string;
}
const initialState: CoursesState = { items: [], loading: false };

export const fetchCourses = createAsyncThunk<Course[]>(
  "courses/fetch",
  async () => getCourses()
);

const slice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCourses.pending, (s) => {
      s.loading = true;
      s.error = undefined;
    })
      .addCase(fetchCourses.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchCourses.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      });
  },
});

export default slice.reducer;
