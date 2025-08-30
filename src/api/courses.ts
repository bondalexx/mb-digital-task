import type { Course } from "../types";

const MOCK: Course[] = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description:
      "JSX, компоненти, пропси, стан, ефекти — база сучасного React.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    price: 29,
  },
  {
    id: "ts-essentials",
    title: "TypeScript Essentials",
    description: "Типи, інтерфейси, generics, utility types, best practices.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    price: 25,
  },
  {
    id: "redux-toolkit",
    title: "Redux Toolkit Quickstart",
    description: "Slice, store, RTK Query, іммутабельність, devtools.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    price: 19,
  },
];
function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function getCourses(): Promise<Course[]> {
  await delay(400);
  return MOCK;
}

export async function handlePurchase(
  courseId: string
): Promise<{ success: true } | { success: false; error: string }> {
  await delay(600);
  if (Math.random() < 0.85) return { success: true };
  return { success: false, error: "Платіж відхилено. Спробуйте ще раз." };
}
