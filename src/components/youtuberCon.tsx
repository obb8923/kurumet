import Image from "next/image";
import { useActions } from "@/store/StateCon";
import { YoutuberConProps } from "@/types/props/YoutuberConProps";

const YoutuberCon = ({ program, programKor, isSelected }: YoutuberConProps) => {
  const { pushList, popList, findList } = useActions();
  const clickHandler = () => {
    findList(program) ? popList(program) : pushList(program);
  };

  return (
    <div className="flex flex-col items-center hover:cursor-pointer">
      <div
        className="rounded-full w-8 h-8 bg-gray-300 "
        onClick={() => clickHandler()}
      >
        <Image
          src={require(`../../public/profileImg/${program}.png`)}
          alt={`프로필사진 ${program}}`}
          className="rounded-full w-8 h-8 bg-gray-300 object-cover"
        />
      </div>
      {!isSelected && <small className="whitespace-nowrap">{programKor}</small>}
    </div>
  );
};

export default YoutuberCon;
