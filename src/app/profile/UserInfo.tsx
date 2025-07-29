import React from 'react'

const UserInfo = ({title, val}: {title: string; val: string}) => {
    
  return (
    <div className="userName">
      <div className="">{title}</div>
      <input
        className="outline-none h-[40px] p-2 rounded-lg shadow shadow-white-500 w-[90%] text-sm "
        type="text"
        placeholder={`${val}`}
      />
    </div>
  );
}

export default UserInfo