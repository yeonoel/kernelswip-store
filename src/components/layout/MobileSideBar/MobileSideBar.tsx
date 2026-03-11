export default function MobileSideBar() {
    return (
        <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Mobile Sidebar</h2>
            <ul className="space-y-2">
                <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Homme</a></li>
                <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Femme</a></li>
                <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Enfant</a></li>
            </ul>
        </div>
    );
}