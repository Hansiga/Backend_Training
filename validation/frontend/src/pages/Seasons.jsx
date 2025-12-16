import { useState } from "react";
import SeasonBox from "../components/SeasonBox";

const Seasons = () => {
  const [season, setSeason] = useState("");

  return (
    <div className="center">
      <h2>Select Season</h2>
      <button onClick={() => setSeason("summer")}>Summer</button>
      <button onClick={() => setSeason("winter")}>Winter</button>
      <button onClick={() => setSeason("autumn")}>Autumn</button>

      <SeasonBox season={season} />
    </div>
  );
};

export default Seasons;
