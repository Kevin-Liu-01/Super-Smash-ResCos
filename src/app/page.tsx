import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Welcome to Smash-Like Game</h1>
      <nav>
        <Link href="/game" style={{ margin: "10px" }}>
          Play Game
        </Link>
        <Link href="/map-editor" style={{ margin: "10px" }}>
          Map Editor
        </Link>
        <Link href="/character-creator" style={{ margin: "10px" }}>
          Character Creator
        </Link>
      </nav>
    </main>
  );
}
