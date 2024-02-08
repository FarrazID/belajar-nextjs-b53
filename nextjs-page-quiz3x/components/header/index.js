import Link from "next/link";

export default function Header() {
    return (
        <div className="flex px-10 py-4 mb-10 bg-pink-900">
            <h1 className="font-bold text-white">NOTES</h1>

            <ul>
                <li><Link href="/">Home (API Data Fetching - using getStaticProps)</Link></li>
                {/* <li><Link href="/profile">Profile</Link></li>
                <li><Link href="/users">User</Link></li> */}
                <li><Link href="/notes">Notes (API Data Fetching - using Custom-Hook)</Link></li>
            </ul>
        </div>

        // <div >
        //     <h1 >NOTES</h1>
        // </div>
    )
}