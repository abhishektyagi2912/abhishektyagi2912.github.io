export default function Footer() {
  return (
    <footer className="border-t border-line bg-void px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center font-mono text-xs text-mist/60 md:flex-row md:text-left">
        <span>© {new Date().getFullYear()} Abhishek Tyagi.</span>
        <span>Keep cALM and code On.</span>
      </div>
    </footer>
  )
}
