import {useState} from "react";
import {faker} from "@faker-js/faker";

function MenuDropdownComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownState = isOpen ? 'block' : 'hidden'

    const toggleDropdown = () => setIsOpen(value => !value)

    return (
        <div style={{position: 'relative'}}>
            <button
                id="dropdownAvatarNameButton"
                data-dropdown-toggle="dropdownAvatarName"
                onClick={toggleDropdown}
                className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring"
                type="button"
            >
                <span className="sr-only">Open user menu</span>
                Leslie Alexander
                <img className="w-8 h-8 ms-2 rounded-full" alt="user photo" src={faker.image.avatar()}/>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m1 1 4 4 4-4"/>
                </svg>
            </button>

            <div
                id="dropdownAvatarName"
                className={`border border-[#D7DFE9] z-10 divide-y rounded-lg shadow w-44 bg-[#FFFFFF] divide-gray-600 ${dropdownState}`}
                style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    margin: '0px',
                    transform: 'translate(0, 40px)'
                }}
            >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="font-medium ">Pro User</div>
                    <div className="truncate">name@flowbite.com</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                    <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#"
                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
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