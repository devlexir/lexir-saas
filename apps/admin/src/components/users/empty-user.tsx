const EmptyUser = () => {
  return (
    <div
      className='flex h-[67vh] content-center items-center justify-center 
      rounded-lg border border-[#E7E7E7] shadow'
    >
      <div className='flex h-fit flex-col justify-center text-2xl text-[#6F6F6F]'>
        <span className='flex justify-center font-semibold'>No Users Yet</span>
        <span className='flex font-light'>Please add a user</span>
      </div>
    </div>
  );
};

export default EmptyUser;
