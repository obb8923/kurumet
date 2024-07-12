import { useActions } from "@/store/StateCon";
type props = {
  name: string;
};
export default function YoutuberCon(props: props) {
  const { pushList, popList, findList } = useActions();
  const clickHandler = (name: string) => {
    findList(name) ? popList(name) : pushList(name);
  };
  return (
    <div className="flex flex-col items-center hover:cursor-pointer">
      <div
        className="rounded-full w-8 h-8 bg-gray-300 "
        onClick={() => clickHandler(props.name)}
      ></div>
      <small>{props.name}</small>
    </div>
  );
}
