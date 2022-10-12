interface IProgress {
  status: string | undefined;
  available_percentage: number | undefined;
}

const Progress = ({ status, available_percentage }: IProgress) => {
  switch (status) {
    case 'Low':
      return (
        <div
          className='h-2 rounded-full bg-[#CB5757]'
          style={{ width: `${available_percentage}%` }}
        />
      );
    case 'Running Low':
      return (
        <div
          className='h-2 rounded-full bg-[#E3BD4A]'
          style={{ width: `${available_percentage}%` }}
        />
      );
    case 'Plenty of Stock':
      return (
        <div
          className='h-2 rounded-full bg-[#1C8C64]'
          style={{ width: `${available_percentage}%` }}
        />
      );
    default:
      return (
        <div
          className='h-2 rounded-full bg-white'
          style={{ width: `${available_percentage}%` }}
        />
      );
  }
};

export default Progress;
