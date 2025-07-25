import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { GitHubRepoList, GitHubLanguagesChart } from "./components/showcase/Showcase.tsx"
import StackBadge from "./components/stack-badge/StackBadge.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <StackBadge />
    </>
  )
}

export default App
