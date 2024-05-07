// import { PlaygroundSandbox } from './Playground/PlaygroundSandbox'
import { Playground as PlaygroundSandbox } from '@/Playground'

function App() {
  // const handleFilesHash = (hash: string) => {
  //   window.location.hash = hash
  // }

  return <PlaygroundSandbox saveOnUrl={false} />
}

export default App
