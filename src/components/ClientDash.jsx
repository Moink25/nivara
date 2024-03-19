const ClientDash = () => {
  return (
    <div className="h-auto  gap-2 px-8 ">
      <div className="h-72 w-3/4 shadow-lg shadow-gray-200 mt-9 rounded-md bg-white">
        <h1 className="font-semibold text-md ml-7 mt-8">My Progress</h1>
        <div className="h-4/5 w-full flex  px-4 justify-start gap-12 mt-7">
          <div class="relative size-40">
            <svg
              class="size-full"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                class="stroke-current text-gray-200 dark:text-gray-700"
                stroke-width="2"
              ></circle>
              <clipPath id="circleClip">
                <circle cx="18" cy="18" r="16"></circle>
              </clipPath>

              <g class="origin-center -rotate-90 transform">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  class="stroke-current text-[#802bb1] overflow-hidden "
                  stroke-width="2"
                  stroke-dasharray="100"
                  stroke-dashoffset="40"
                ></circle>
              </g>
            </svg>
          </div>
          <div className="w-1/2  px-10 h-2/5 mt-7">
            <div className="flex justify-between mb-4">
              <h2>My Projects</h2>
              <h2>5</h2>
            </div>
            <div className="flex justify-between mb-4">
              <h2>Completed Projects</h2>
              <h2>3</h2>
            </div>
            <div className="flex justify-between mb-4">
              <h2>Remaining Projects</h2>
              <h2>2</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="h-64 w-full"></div>
    </div>
  );
};

export default ClientDash;
