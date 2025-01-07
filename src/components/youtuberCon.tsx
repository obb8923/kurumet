import Image from "next/image";
import { useActions } from "@/store/StateCon";
import { YoutuberConProps } from "@/types/props/YoutuberConProps";

const YoutuberCon = ({ name }: YoutuberConProps) => {
  const { pushList, popList, findList } = useActions();
  const clickHandler = () => {
    findList(name) ? popList(name) : pushList(name);
  };

  return (
    <div className="flex flex-col items-center hover:cursor-pointer">
      <div
        className="rounded-full w-8 h-8 bg-gray-300 "
        onClick={() => clickHandler()}
      >
        <Image
          src={require(`../../public/profileImg/${name}.jpg`)}
          alt={`프로필사진 ${name}}`}
          className="rounded-full w-8 h-8 bg-gray-300 object-cover"
        />
      </div>
      <small className="hidden lg:block">{name}</small>
    </div>
  );
};

export default YoutuberCon;
