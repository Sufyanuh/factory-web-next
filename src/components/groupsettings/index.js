import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SettingTabs from './SettingTabs'
import GeneralTab from './GeneralTab'
import ManageTopicTab from './ManageTopicTab'

const GroupSettingsPage = ({ group }) => {
    return (
        <main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]">
            <div className="max-w-2xl mx-auto">
                {/* heading title */}
                <div className="page__heading py-6 mt-6">
                    <Link href="#">
                        <ion-icon name="chevron-back-outline" /> Back
                    </Link>
                    <h1>Settings</h1>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm dark:border-slate-700 dark:bg-dark2">
                    <div className="flex md:gap-8 gap-4 items-center md:p-10 p-6">
                        <div className="relative md:w-20 md:h-20 w-12 h-12 shrink-0">
                            <label htmlFor="file" className="cursor-pointer">
                                <Image
                                    id="img"
                                    src={group?.thumbnail}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full rounded-full"
                                    alt=""
                                />
                                <input type="file" id="file" className="hidden" />
                            </label>
                            <label
                                htmlFor="file"
                                className="md:p-1 p-0.5 rounded-full bg-slate-600 md:border-4 border-white absolute -bottom-2 -right-2 cursor-pointer dark:border-slate-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="md:w-4 md:h-4 w-3 h-3 fill-white"
                                >
                                    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input id="file" type="file" className="hidden" />
                            </label>
                        </div>
                        <div className="flex-1">
                            <h3 className="md:text-xl text-base font-semibold text-black dark:text-white">
                                {group?.name}
                            </h3>
                            <p className="text-sm text-slate-400 mt-1 font-normal">{group?.memberCount} members</p>
                        </div>
                    </div>
                    <hr className="border-t border-gray-100 dark:border-slate-700" />
                    {/* nav tabs */}
                    <SettingTabs />
                </div>
                {/* tab content */}
                <div className="mt-6 mb-20 text-sm font-medium text-gray-600 dark:text-white/80">
                    <div
                        id="setting_tab"
                        className="uk-switcher bg-white border rounded-xl shadow-sm md:py-12 md:px-20 p-6 overflow-hidden dark:border-slate-700 dark:bg-dark2"
                    >
                        {/* tab basic info */}
                        <GeneralTab thumbnail={group?.thumbnail} name={group?.name} />

                        {/* tab manage topics */}
                        <ManageTopicTab />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default GroupSettingsPage