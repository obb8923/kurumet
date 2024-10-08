import Image from "next/image";
import { useActions } from "@/store/StateCon";

type Props = {
  name: string;
};

export default function YoutuberCon(props: Props) {
  const { pushList, popList, findList } = useActions();
  const clickHandler = (name: string) => {
    findList(name) ? popList(name) : pushList(name);
  };

  return (
    <div className="flex flex-col items-center hover:cursor-pointer">
      <div
        className="rounded-full w-8 h-8 bg-gray-300 "
        onClick={() => clickHandler(props.name)}
      >
        <Image
          src={require(`../../public/profileImg/${props.name}.jpg`)}
          alt={`프로필사진 ${props.name}}`}
          className="rounded-full w-8 h-8 bg-gray-300 object-cover"
        />
      </div>
      <small className="hidden lg:block">{props.name}</small>
    </div>
  );
}
