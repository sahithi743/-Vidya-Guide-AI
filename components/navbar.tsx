import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <h1 className="text-2xl font-bold">PlacementAI</h1>
        </Link>
        
        <nav className="flex gap-8 items-center">
          <Link href="/student" className="text-muted-foreground hover:text-foreground transition">
            Student
          </Link>
          <Link href="/instructor" className="text-muted-foreground hover:text-foreground transition">
            Instructor
          </Link>
          <Link href="/rankings" className="text-muted-foreground hover:text-foreground transition">
            Rankings
          </Link>
          <Link href="/ai-chat" className="text-muted-foreground hover:text-foreground transition">
            AI Support
          </Link>
        </nav>
      </div>
    </header>
  )
}
