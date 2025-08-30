import { useAppSelector, useAppDispatch } from "../store/hooks";
import { openPlayer } from "../features/player/playerSlice";
import { selectIsPurchased } from "../features/purchases/purchasesSlice";

export default function CourseDetails({ courseId }: { courseId: string }) {
  const course = useAppSelector((s) =>
    s.courses.items.find((c) => c.id === courseId)
  );
  const isPurchased = useAppSelector(selectIsPurchased(courseId));
  const dispatch = useAppDispatch();

  if (!course) return null;

  const lessons = [
    { id: "l1", title: "Вступ" },
    { id: "l2", title: "Компоненти та пропси" },
    { id: "l3", title: "Стан та ефекти" },
  ];

  const resources = [
    { id: "r1", name: "Слайди PDF", url: "#slides.pdf" },
    { id: "r2", name: "Проєкт-старт (zip)", url: "#starter.zip" },
  ];

  const onPlay = () => {
    dispatch(openPlayer({ courseId }));
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>{course.title}</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <h3>Програма</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {lessons.map((l) => (
              <li
                key={l.id}
                style={{
                  padding: "10px 12px",
                  border: "1px solid #1f2937",
                  borderRadius: 10,
                  marginBottom: 8,
                  opacity: isPurchased ? 1 : 0.7,
                  position: "relative",
                  cursor: isPurchased ? "pointer" : "not-allowed",
                }}
                onClick={isPurchased ? onPlay : undefined}
              >
                {!isPurchased && <span style={{ marginRight: 8 }}>🔒</span>}
                {l.title}
                {isPurchased && (
                  <span style={{ float: "right", opacity: 0.8 }}>▶</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Матеріали</h3>
          {!isPurchased && (
            <div className="err" style={{ marginBottom: 8 }}>
              Купіть курс, щоб отримати доступ до матеріалів
            </div>
          )}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {resources.map((r) => (
              <li
                key={r.id}
                style={{
                  padding: "10px 12px",
                  border: "1px solid #1f2937",
                  borderRadius: 10,
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: isPurchased ? 1 : 0.6,
                }}
              >
                <span>{r.name}</span>
                {isPurchased ? (
                  <a className="btn" href={r.url} download>
                    Завантажити
                  </a>
                ) : (
                  <button className="btn" disabled>
                    Недоступно 🔒
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button className="btn btn--primary" onClick={onPlay}>
          {isPurchased ? "Переглянути курс" : "Дивитися превʼю"}
        </button>
      </div>
    </div>
  );
}
