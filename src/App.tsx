import './App.css'
import Main from './components/Main/Main'
import SideBar from './components/Sidebar/SideBar'
import ContextProvider from './components/context/Context'
function App() {

  return (
    <ContextProvider>
      <SideBar />
      <Main />
    </ContextProvider>
  )
}

export default App
