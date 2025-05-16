import { useState } from 'react'
import Navbar from "./components/Navbar";
import PipelineBoard from "./components/PipelineBoard";

function App() {
  return (
    <div className="min-h-screen bg-mint flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col pt-16">
        <PipelineBoard />
      </main>
    </div>
  );
}

export default App
