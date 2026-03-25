export default function Notification({ message }) {
  return (
    <div className="notification show" role="alert" aria-live="polite">
      {message}
    </div>
  );
}
