export default function Layout({children}: {children: any}) {
    return (
        <div className="w-full min-h-screen absolute top-0">
            {children}
        </div>
    )
}