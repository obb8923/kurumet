import YoutuberCon from "./youtuberCon";
import { programs } from "@/constants/programs";
const EveryConList = () => {
  return (
    <div className="w-full h-full flex gap-2">
      {programs.map((data) => (
        <YoutuberCon key={data.program} program={data.program} programKor={data.programKor} isSelected={false} />
      ))}
    </div>
  );
};
export default EveryConList;
