import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const links = [
  { name: 'Home', href: '/' },
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
]

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className="w-screen min-h-screen relative">
    <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
      <div className="px-4 my-4">
        <span className="text-3xl">FeelFlow</span>
      </div>
      <div>
        <ul className="px-4">
          {links.map((link) => (
            <li key={link.name} className="text-xl my-4">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
    <div className="ml-[200px] h-full">
      <header className="h-[60px] border-b border-black/10">
        <div className="h-full w-full px-6 flex items-center justify-end">
          <UserButton
            afterSignOutUrl='/sign-in'
          />
        </div>
      </header>
      <div className="h-[calc(100vh-62px)]">{children}</div>
    </div>
  </div>
}

export default DashboardLayout