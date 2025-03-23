import Link from "next/link";

interface ButtonProps {
  name: string;
  path?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
}

const ProdBtn: React.FC<ButtonProps> = ({ name, path, onClick }) => {
  return (
    <Link href={`${path || ""}`}>
      <button 
        onClick={onClick}
        className="text-gray-600 text-sm font-bold bg-transparent h-10 w-fit p-2 shadow rounded-lg shadow-gray-300 cursor-pointer duration-300 hover:bg-gray-100 border-1 border-gray-200">
        {name}
      </button>
    </Link>
  );
};

export default ProdBtn;
