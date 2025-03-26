import React from 'react'
import Image from 'next/image'

const GeneralTab = ({
    thumbnail,
    name
}) => {
    return (
        <div>
            <div>
                <div className="space-y-6">
                    <div className="md:flex items-center gap-10">
                        <label className="md:w-32 text-right"> Name </label>
                        <div className="flex-1 max-md:mt-4">
                            <input
                                type="text"
                                placeholder={name}
                                defaultValue={name}
                                className="w-full"
                            />
                        </div>
                    </div>
                    {/* <div className="md:flex items-center gap-10">
                        <label className="md:w-32 text-right"> Email </label>
                        <div className="flex-1 max-md:mt-4">
                            <input
                                type="text"
                                placeholder="info@mydomain.com"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="md:flex items-start gap-10">
                        <label className="md:w-32 text-right"> Bio </label>
                        <div className="flex-1 max-md:mt-4">
                            <textarea
                                className="w-full"
                                rows={5}
                                placeholder="Inter your Bio"
                                defaultValue={""}
                            />
                        </div>
                    </div>
                    <div className="md:flex items-center gap-10">
                        <label className="md:w-32 text-right"> Gender </label>
                        <div className="flex-1 max-md:mt-4">
                            <select className="!border-0 !rounded-md lg:w-1/2 w-full">
                                <option value={1}>Male</option>
                                <option value={2}>Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="md:flex items-center gap-10">
                        <label className="md:w-32 text-right"> Relationship </label>
                        <div className="flex-1 max-md:mt-4">
                            <select className="!border-0 !rounded-md lg:w-1/2 w-full">
                                <option value={0}>None</option>
                                <option value={1}>Single</option>
                                <option value={2}>In a relationship</option>
                                <option value={3}>Married</option>
                                <option value={4}>Engaged</option>
                            </select>
                        </div>
                    </div> */}
                    <div className="md:flex items-start gap-10" hidden="">
                        <label className="md:w-32 text-right"> Avatar </label>
                        <div className="flex-1 flex items-center gap-5 max-md:mt-4">
                            <Image
                                src={thumbnail}
                                alt=""
                                width={100}
                                height={100}
                                className="w-10 h-10 rounded-full"
                            />
                            <button
                                type="submit"
                                className="px-4 py-1 rounded-full bg-slate-100/60 border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-16">
                    <button
                        type="submit"
                        className="button lg:px-6 bg-secondery max-md:flex-1"
                    >
                        Cancle
                    </button>
                    <button
                        type="submit"
                        className="button lg:px-10 bg-primary text-white max-md:flex-1"
                    >
                        Save <span className="ripple-overlay" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GeneralTab