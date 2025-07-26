import { LogOut } from "lucide-react";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface ButtonProps {
  name?: string;
  path?: string;
  icon?: string;
  onClick?: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({ name, path, icon, onClick }) => {
  return (
    <Link href={`${path || ""}`}>
      <button className={`text-white text-sm font-bold ${icon ? `bg-rose-400` : `bg-sky-600`} h-10 w-fit p-2 shadow rounded-md shadow-sky-950 cursor-pointer duration-300 ${icon ? `hover:bg-red-700` : `hover:bg-sky-500`}`}>
        {icon === "logOut" ? <LogOut onClick={onClick}/> : name }
      </button>
    </Link>
  );
};

export default Button;
