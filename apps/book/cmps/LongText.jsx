

export function LongText({ txt, isReadMore, toggleReadMore }) {
  if (!txt) return
  if (txt.length > 100) {
    txt = isReadMore ? txt : txt.substring(0, 100) + "...";

  }

  return (
    <div>
      {txt}
      {txt.length > 100 && (
        <button onClick={toggleReadMore}>
          {isReadMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
