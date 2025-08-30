import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closePlayer } from "../features/player/playerSlice";
import VideoPlayer from "./VideoPlayer";
import "../styles/modal.css";

export default function VideoModal() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((s) => s.player);
  if (!isOpen) return null;

  return createPortal(
    <div className="modal__backdrop" onClick={() => dispatch(closePlayer())}>
      <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={() => dispatch(closePlayer())}
        >
          ×
        </button>
        <VideoPlayer />
      </div>
    </div>,
    document.body
  );
}
