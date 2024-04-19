import { UserButton } from "@clerk/nextjs"

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <div className="w-screen min-h-screen relative">
    <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
      FeelFlow
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