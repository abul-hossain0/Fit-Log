const Loading = () => {
  return (
    <main className="min-h-screen bg-[#0b0d10] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="animate-pulse rounded-lg border border-[#20242b] bg-[#15181e] p-6 sm:p-8 lg:h-[190px]">
          <div className="h-3 w-28 rounded bg-[#252a31]" />

          <div className="mt-5 h-8 w-full max-w-md rounded bg-[#252a31]" />

          <div className="mt-2 h-8 w-3/4 max-w-sm rounded bg-[#252a31]" />

          <div className="mt-4 h-3 w-full max-w-lg rounded bg-[#252a31]" />

          <div className="mt-5 h-9 w-32 rounded bg-[#ccff00]/40" />
        </div>

        <div className="mt-10 animate-pulse">
          <div className="h-5 w-28 rounded bg-[#252a31]" />

          <div className="mt-2 h-3 w-64 rounded bg-[#20242b]" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-lg border border-[#20242b] bg-[#15181e]"
            >
              <div className="h-48 w-full bg-[#252a31]" />

              <div className="p-4">
                <div className="flex gap-2">
                  <div className="h-4 w-14 rounded-full bg-[#252a31]" />
                  <div className="h-4 w-12 rounded-full bg-[#252a31]" />
                </div>

                <div className="mt-4 h-4 w-3/4 rounded bg-[#252a31]" />

                <div className="mt-2 h-3 w-1/2 rounded bg-[#20242b]" />

                <div className="mt-4 flex gap-4">
                  <div className="h-3 w-12 rounded bg-[#20242b]" />
                  <div className="h-3 w-12 rounded bg-[#20242b]" />
                  <div className="h-3 w-10 rounded bg-[#20242b]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
