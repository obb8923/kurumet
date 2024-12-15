import YoutuberCon from "./youtuberCon";
import { programs } from "@/constants/programs";
const EveryConList = () => {
  return (
    <div className="w-full h-full flex gap-2">
      {programs.map((program) => (
        <YoutuberCon key={program} name={program} />
      ))}
    </div>
  );
};
export default EveryConList;
