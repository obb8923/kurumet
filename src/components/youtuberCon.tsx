import { useStore } from "@/store/StateCon";
type props = {
  name: string;
};
export default function YoutuberCon(props: props) {
  const { pushList, popList, findList } = useStore();
  const clickHandler = (name: string) => {
    findList(name) ? popList(name) : pushList(name);
    console.log("list:", useStore.getState().list);
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
