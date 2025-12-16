const SeasonBox = ({ season }) => {
  if (!season) return null;

  const details = {
    summer: "Summer is hot and sunny",
    winter: "Winter is cold and chilly",
    autumn: "Autumn has cool breeze and falling leaves"
  };

  return (
    <div style={{ border: "1px solid black", padding: "20px", marginTop: "20px" }}>
      <h3>{season.toUpperCase()}</h3>
      <p>{details[season]}</p>
    </div>
  );
};

export default SeasonBox;
