import { useCallback, useEffect, useState } from "react";
import {
  captureImageUrl,
  listCaptures,
  type FoodCapture,
} from "../api";
import "./ItemCalendar.css";

const POLL_MS = 12_000;

function formatWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function ItemCalendar() {
  const [captures, setCaptures] = useState<FoodCapture[]>([]);
  const [deletedCaptureIds, setDeletedCaptureIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const list = await listCaptures();
      setCaptures(list.filter((capture) => !deletedCaptureIds.includes(capture.id)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load captures.");
    } finally {
      setLoading(false);
    }
  }, [deletedCaptureIds]);

  const handleDelete = useCallback((id: number) => {
    setDeletedCaptureIds((ids) => [...ids, id]);
    setCaptures((items) => items.filter((item) => item.id !== id));
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), POLL_MS);
    return () => window.clearInterval(id);
  }, [load]);

  return (
    <section className="page items-page">
      <div className="items-shell">
        <header className="items-header card items-intro">
          <h2>Camera captures</h2>
          <p>
            Photos analyzed from your device appear here while you are signed in.
            The list refreshes automatically every few seconds.
          </p>
          <button type="button" className="items-refresh" onClick={() => void load()}>
            Refresh now
          </button>
        </header>

        {loading && captures.length === 0 ? (
          <p className="items-status">Loading…</p>
        ) : null}

        {error ? <p className="items-status items-error">{error}</p> : null}

        {!loading && !error && captures.length === 0 ? (
          <p className="items-status">No captures yet. Send an image from the camera backend.</p>
        ) : null}

        <ul className="captures-list">
          {captures.map((c) => (
            <li key={c.id} className="captures-item card">
              <div className="captures-media">
                <img
                  src={captureImageUrl(c.filename)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="captures-thumb"
                />
              </div>
              <div className="captures-body">
                <div className="captures-row">
                  <time className="captures-time" dateTime={c.created_at}>
                    {formatWhen(c.created_at)}
                  </time>
                  <button
                    type="button"
                    className="captures-delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </div>
                <p className="captures-text">{c.response_text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ItemCalendar;
