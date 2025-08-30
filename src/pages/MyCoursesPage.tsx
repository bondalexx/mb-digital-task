import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCourses } from "../features/courses/coursesSlice";
import { openPlayer } from "../features/player/playerSlice";
import { Link, useNavigate } from "react-router-dom";
import VideoModal from "../components/VideoModal";

function secondsToMmSs(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function MyCoursesPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((s) => s.auth.user);
  const { items, loading: coursesLoading } = useAppSelector((s) => s.courses);
  const purchasedIds = useAppSelector((s) => s.purchases.purchasedIds);
  const positions = useAppSelector((s) => s.player.positions);

  useEffect(() => {
    if (!items.length) dispatch(fetchCourses());
  }, [dispatch, items.length]);

  const ownedCourses = useMemo(
    () => items.filter((c) => purchasedIds.includes(c.id)),
    [items, purchasedIds]
  );

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div>
      <h2>Мої курси</h2>

      {coursesLoading && <p>Завантаження…</p>}

      {!coursesLoading && ownedCourses.length === 0 && (
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Немає куплених курсів</h3>
          <p style={{ opacity: 0.85 }}>
            Перейдіть до каталогу та оберіть курс. Ви зможете переглянути превʼю
            перед покупкою.
          </p>
          <Link className="btn btn--primary" to="/">
            До каталогу
          </Link>
        </div>
      )}

      <div className="grid" style={{ marginTop: 12 }}>
        {ownedCourses.map((course) => {
          const pos = positions[course.id] ?? 0;
          const hasProgress = pos > 5;

          return (
            <div key={course.id} className="card">
              <div className="card__body">
                <h3 className="card__title">{course.title}</h3>
                <p className="card__desc">{course.description}</p>
              </div>
              <div
                className="card__footer"
                style={{ gap: 8, flexWrap: "wrap" }}
              >
                <button
                  className="btn btn--primary"
                  onClick={() => dispatch(openPlayer({ courseId: course.id }))}
                >
                  Переглянути
                </button>
                {hasProgress && (
                  <button
                    className="btn"
                    onClick={() =>
                      dispatch(
                        openPlayer({ courseId: course.id, startTime: pos })
                      )
                    }
                  >
                    Продовжити з {secondsToMmSs(pos)}
                  </button>
                )}
                <span className="price" style={{ opacity: 0.75 }}>
                  Куплено
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <VideoModal />
    </div>
  );
}
