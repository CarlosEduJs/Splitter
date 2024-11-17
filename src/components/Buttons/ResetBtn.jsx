export default function ResetBtn({ action }) {
  return (
    <button
      onClick={action}
      className="bg-primary-cyan p-1 rounded-lg font-bold"
    >
      RESET
    </button>
  );
}
