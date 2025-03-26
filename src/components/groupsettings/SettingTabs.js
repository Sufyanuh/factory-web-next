import React from 'react'
import Link from 'next/link'
const SettingTabs = () => {
    return (
        <div
            className="relative -mb-px px-2"
            tabIndex={-1}
            uk-slider="finite: true"
        >
            <nav className="overflow-hidden rounded-xl uk-slider-container pt-2">
                <ul
                    className="uk-slider-items w-[calc(100%+10px)] capitalize font-semibold text-gray-500 text-sm dark:text-white"
                    uk-switcher="connect: #setting_tab ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
                >
                    <li className="w-auto pr-2.5">
                        <Link
                            href="#"
                            className="inline-block p-4 pt-2 border-b-2 border-transparent aria-expanded:text-blue-500 aria-expanded:border-blue-500"
                        >
                            General
                        </Link>
                    </li>
                    <li className="w-auto pr-2.5">
                        <Link
                            href="#"
                            className="inline-block p-4 pt-2 border-b-2 border-transparent aria-expanded:text-blue-500 aria-expanded:border-blue-500"
                        >
                            manage topics
                        </Link>
                    </li>
                </ul>
            </nav>
            <Link
                className="absolute -translate-y-1/2 top-1/2 left-0 flex items-center w-20 h-full p-2.5 justify-start rounded-xl bg-gradient-to-r from-white via-white dark:from-slate-800 dark:via-slate-800"
                href="#"
                uk-slider-item="previous"
            >
                <ion-icon name="chevron-back" className="text-2xl ml-1" />
            </Link>
            <Link
                className="absolute right-0 -translate-y-1/2 top-1/2 flex items-center w-20 h-full p-2.5 justify-end rounded-xl bg-gradient-to-l from-white via-white dark:from-slate-800 dark:via-slate-800"
                href="#"
                uk-slider-item="next"
            >
                <ion-icon name="chevron-forward" className="text-2xl mr-1" />
            </Link>
        </div>
    )
}

export default SettingTabs