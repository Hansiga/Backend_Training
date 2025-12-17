import axios from "axios";

const SeasonBox = ({ season }) => {
  if (!season) return null;

  const details = {
    summer: "Summer is hot and sunny",
    winter: "Winter is cold and chilly",
    autumn: "Autumn has cool breeze and falling leaves"
  };

  const username = "hansi"; // later you can take from login

  const handleLove = async () => {
    try {
      await axios.post("http://localhost:3000/api/love", {
        username,
        season
      });
      alert("Loved ❤️");
    } catch (error) {
      alert("Error saving love");
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "20px",
        marginTop: "20px",
        textAlign: "center"
      }}
    >
      <h3>{season.toUpperCase()}</h3>
      <p>{details[season]}</p>

      {/* ❤️ Love Button */}
      <button
        onClick={handleLove}
        style={{
          marginTop: "10px",
          backgroundColor: "#ff4d6d",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "20px",
          cursor: "pointer"
        }}
      >
        ❤️ I Love
      </button>
    </div>
  );
};

export default SeasonBox;
