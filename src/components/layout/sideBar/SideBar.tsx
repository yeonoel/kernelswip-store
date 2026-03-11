export default function SideBar() {
    return (
        <div className="hidden md:block w-64 text-tertiary p-4">
            <ul className="flex justify-between ">
                <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Homme</a></li>
                <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Femme</a></li>
                <li><a href="#" className="block hover:bg-gray-700 p-2 rounded">Enfants</a></li>
            </ul>
        </div>
    );
}