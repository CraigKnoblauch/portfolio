export default function FrontPage({ isLoaded }) {

  let buttonClasses = "rounded-lg border-4 border-black px-8 py-2 opacity-50"
  let buttonContent = "Loading"
  if (isLoaded) {
    buttonClasses = "rounded-lg border-4 border-black px-8 py-2"
    buttonContent = "Enter the beta"
  }

  return <>
    <div className="flex items-center justify-center h-screen bg-customSand text-black font-bold">
      <ul className="flex flex-col items-center justify-center text-black font-bold">
        <li className="text-8xl">Craig Knoblauch</li>
        <li className="text-5xl">Software Engineer</li>
        <li className="text-2xl">Experience a pre-release of my portfolio</li>
        <li className="text-lg">Best experienced on a desktop</li>
        <li>
          <button className={buttonClasses}>
            {buttonContent}
          </button>
        </li>
      </ul>
    </div>
  </>
}