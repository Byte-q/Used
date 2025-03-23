import Link from "next/link";

interface ButtonProps {
  name: string;
  path?: string;
}

const Button: React.FC<ButtonProps> = ({ name, path }) => {
  return (
    <Link href={`${path || ""}`}>
      <button className="text-white text-sm font-bold bg-sky-600 h-10 w-fit p-2 shadow rounded-md shadow-sky-950 cursor-pointer duration-300 hover:bg-sky-500">
        {name}
      </button>
    </Link>
  );
};

export default Button;
