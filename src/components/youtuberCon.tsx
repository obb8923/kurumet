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
    <div
      className="rounded-full bg-blue-300 hover:cursor-pointer"
      onClick={() => clickHandler(props.name)}
    >
      <p>{props.name}</p>
    </div>
  );
}
