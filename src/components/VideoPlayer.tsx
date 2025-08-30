import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setPlaying, setTime } from "../features/player/playerSlice";
import { selectIsPurchased } from "../features/purchases/purchasesSlice";

const PREVIEW_LIMIT = 10;

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dispatch = useAppDispatch();

  const { currentCourseId, currentTime } = useAppSelector((s) => s.player);
  const positions = useAppSelector((s) => s.player.positions);
  const course = useAppSelector((s) =>
    s.courses.items.find((c) => c.id === currentCourseId)
  );
  const user = useAppSelector((s) => s.auth.user);
  const isPurchased = useAppSelector(
    currentCourseId ? selectIsPurchased(currentCourseId) : () => false
  );
  const hasFullAccess = !!user && isPurchased;

  const src = useMemo(() => course?.videoUrl ?? "", [course]);

  const desiredTime = currentTime || positions[currentCourseId ?? ""] || 0;

  const applyTime = (v: HTMLVideoElement, t: number) => {
    if (!Number.isFinite(t) || t < 0) return;
    try {
      if (Math.abs(v.currentTime - t) > 0.3) v.currentTime = t;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => {
      if (!hasFullAccess && v.currentTime > PREVIEW_LIMIT) {
        v.pause();
        v.currentTime = PREVIEW_LIMIT;
      }
      dispatch(setTime(v.currentTime));
    };

    const onPlay = () => dispatch(setPlaying(true));
    const onPause = () => dispatch(setPlaying(false));

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [dispatch, hasFullAccess]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const setWhenReady = () => applyTime(v, desiredTime);

    if (v.readyState >= 1) {
      setWhenReady();
    } else {
      v.addEventListener("loadedmetadata", setWhenReady, { once: true });
      return () => v.removeEventListener("loadedmetadata", setWhenReady);
    }
  }, [src, desiredTime]);

  if (!course) return <p>Курс не знайдено</p>;

  return (
    <div>
      <h3>{course.title}</h3>
      {!hasFullAccess && (
        <div style={{ margin: "6px 0", opacity: 0.9 }}>
          Доступне превʼю {PREVIEW_LIMIT} сек. Увійдіть та придбайте курс, щоб
          дивитись повністю.
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        controls
        style={{ width: "100%", maxHeight: 480 }}
      />
    </div>
  );
}
