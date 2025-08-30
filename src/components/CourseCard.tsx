import { type Course } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openPlayer } from "../features/player/playerSlice";
import {
  purchaseCourse,
  selectIsPurchased,
  selectPurchaseStatus,
} from "../features/purchases/purchasesSlice";
import "../styles/card.css";

interface Props {
  course: Course;
}

function mmss(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function CourseCard({ course }: Props) {
  const dispatch = useAppDispatch();

  const user = useAppSelector((s) => s.auth.user);

  const isPurchased = useAppSelector(selectIsPurchased(course.id));
  const status = useAppSelector(selectPurchaseStatus(course.id));
  const loading = status === "processing";

  const pos = useAppSelector((s) => s.player.positions[course.id] ?? 0);
  const hasProgress = pos > 5;

  const fullAccess = !!user && isPurchased;

  const onOpenPreview = () => {
    dispatch(openPlayer({ courseId: course.id }));
  };

  const onOpenFull = () => {
    if (!fullAccess) {
      onOpenPreview();
      return;
    }
    dispatch(openPlayer({ courseId: course.id }));
  };

  const onContinue = () => {
    dispatch(openPlayer({ courseId: course.id, startTime: pos }));
  };

  const onBuy = async () => {
    try {
      await dispatch(purchaseCourse(course.id)).unwrap();
      dispatch(openPlayer({ courseId: course.id }));
    } catch (e: any) {
      alert(e?.message || "Не вдалося придбати. Спробуйте ще раз.");
    }
  };

  return (
    <div className="card">
      <div className="card__body">
        <h3 className="card__title">{course.title}</h3>
        <p className="card__desc">{course.description}</p>
      </div>

      <div className="card__footer" style={{ gap: 8, flexWrap: "wrap" }}>
        {fullAccess ? (
          <>
            <button className="btn btn--primary" onClick={onOpenFull}>
              Переглянути
            </button>
            {hasProgress && (
              <button className="btn" onClick={onContinue}>
                Продовжити з {mmss(pos)}
              </button>
            )}
            <span className="price" style={{ opacity: 0.75 }}>
              Куплено
            </span>
          </>
        ) : (
          <>
            <button className="btn" onClick={onOpenPreview}>
              Переглянути (превʼю)
            </button>
            <span className="price">${course.price}</span>
            <button
              disabled={loading}
              className="btn btn--primary"
              onClick={onBuy}
            >
              {loading ? "Оплата…" : "Купити"}
            </button>
            {hasProgress && (
              <button className="btn" onClick={onContinue}>
                Продовжити з {mmss(pos)}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
