export default function NotFound({title = "Page Not Found"}) {
  return (
    <div className="grid h-158 place-items-center bg-[#2f2c4e]">
      <div className="text-center">
        <p className="font-bold text-active text-8xl">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">{title}</h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="./" className="rounded-md bg-active px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Go back home</a>
        </div>
      </div>
    </div>
  )
}
