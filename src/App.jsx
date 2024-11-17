import Container from "./components/Container"
import Logo from "./assets/images/logo.svg"


function App() {
  return (
    <div className="flex flex-col gap-9 items-center justify-center w-screen h-screen bg-neutral-light-grayish-cyan">
      <img src={Logo} alt="logo" />
      <Container/>
    </div>
  )
}

export default App;
