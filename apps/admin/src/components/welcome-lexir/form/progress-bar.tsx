const ProgressBar = ({ progress, step }: any) => {
  return (
    <>
      <div className=" flex flex-col gap-y-1 pt-14">
        <h3 className="text-base text-[#CCCCCC] md:text-lg">Add a New Brand</h3>

        <div className="  flex w-[300px] max-w-md flex-row items-baseline gap-x-2 justify-self-center md:w-screen md:justify-self-start">
          <div className=" z-40 h-1 w-full items-baseline rounded-full bg-[#E0F3ED] align-middle">
            <div
              className="h-1 rounded-full bg-[#1C8C64]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#9E9E9E]">{step}</p>
        </div>
      </div>
    </>
  )
}

export default ProgressBar
