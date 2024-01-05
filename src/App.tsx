// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Calculator from './components/Calculator'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <h1 style={{ fontSize: "max(2em, min(10vw, 3em))", marginBottom: "0.5em" }}>Resistor calculator</h1>
      <Calculator />

      <Footer />
    </>
  )
}

export default App
