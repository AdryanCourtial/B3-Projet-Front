interface Props {
    role: string
    username: string
}

const UserListItem: React.FC<Props> = ({ role, username }) => {
  
  return (
    <div className='h-[30px] w-full bg-white border border-zinc-950 rounded-tl-[10px] rounded-ee-[10px] flex justify-center items-center text-center m-2 ring-2 ring-black'>
        <span className="w-1/2"> { username } </span>
        <span  className="w-1/2"> { role } </span>
    </div>
  );
};

export default UserListItem;
