import {useRef, useState} from "react";
import {faker} from "@faker-js/faker";
import {useClickOutside} from "~/app/presentation/hooks/globals";

function MenuDropdownComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownState = isOpen ? 'block' : 'hidden'
    const menuDropdownRef = useRef(null);

    useClickOutside(menuDropdownRef, () => setIsOpen(false));

    const toggleDropdown = () => setIsOpen(value => !value)

    return (
        <div ref={menuDropdownRef} className="relative">
            <button
                id="dropdownAvatarNameButton"
                data-dropdown-toggle="dropdownAvatarName"
                onClick={toggleDropdown}
                className="flex items-center text-sm p-2 font-medium text-[#0D062D] rounded-full md:me-0 focus:ring"
                type="button"
            >
                Leslie Alexander
                <img className="w-8 h-8 ms-2 rounded-full" alt="user photo" src={faker.image.avatar()}/>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            <div
                id="dropdownAvatarName"
                className={`border border-[#D7DFE9] absolute z-10 divide-y rounded-lg shadow w-44 bg-[#FFFFFF] divide-gray-600 m-0 translate-x-0 translate-y-10 ${dropdownState}`}
                style={{ inset: '0px auto auto 0px' }}
            >
                <div className="px-4 py-3 text-sm text-gray-900">
                    <div className="font-medium ">Pro User</div>
                    <div className="truncate">name@flowbite.com</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                    <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                    </li>
                    <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                    </li>
                    <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100">Earnings</a>
                    </li>
                </ul>
                <div className="py-2">
                    <a href="#"
                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                        out</a>
                </div>
            </div>
        </div>
    )
}

export default MenuDropdownComponent;