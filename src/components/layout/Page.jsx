import Routing from "../routing";

const Page = () => {
  return (
    <div className="w-full h-screen flex justify-center p-4 text-l">
      <div className="w-full md:max-w-120 md:w-auto md:min-w-sm flex flex-col items-start md:justify-center">
        <div className="min-h-[640px] flex flex-col items-start justify-between w-full">
          <Routing />
        </div>
      </div>
    </div>
  );
};

export default Page;
