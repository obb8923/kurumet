import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center my-1 py-1 px-4 lg:px-8 border-r border-black border-solid hover:cursor-pointer">
        <div
          className="logo text-xl"
          onClick={() => {
            router.push("/");
          }}
        >
          kurumet
        </div>
      </div>
  )
}
export default Logo;