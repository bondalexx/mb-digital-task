import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCourses } from "../features/courses/coursesSlice";
import CourseCard from "./CourseCard";
import "../styles/layout.css";

export default function CourseList() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <p>Завантаження курсів…</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div className="grid">
      {items.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </div>
  );
}
