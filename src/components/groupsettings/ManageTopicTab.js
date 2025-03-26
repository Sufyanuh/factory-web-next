import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_TOPICS } from '../../Graphql/Queries';
import { useRouter } from 'next/router';
import { CREATE_TOPIC, DELETE_TOPIC, EDIT_TOPIC } from '../../Graphql/Mutations';
import { toast } from "react-toastify";
import Link from 'next/link';
import ReactModal from 'react-modal';

const ManageTopicTab = () => {
    const router = useRouter();
    const { id } = router.query;
    const [name, setName] = useState("")
    const [selectedTopic, setSelectedTopic] = useState()
    const [addTopicModal, setAddTopicModal] = useState(false)
    const [editTopicModal, setEditTopicModal] = useState(false)

    const [createTopic] = useMutation(CREATE_TOPIC)
    const [editTopic] = useMutation(EDIT_TOPIC)
    const [deleteTopic] = useMutation(DELETE_TOPIC)

    const { data: topics } = useQuery(GET_ALL_TOPICS, {
        variables: {
            groupId: Number(id)
        }
    });

    const handleCreateTopic = async () => {
        // alert("")
        // e.preventDefault()
        // const name = e.target[0].value
        // console.log("name")
        if (!name) {
            toast.error("Please enter a topic name")
            return
        }
        try {
            await createTopic({   // This is the mutation
                variables: {
                    name,
                    groupId: Number(id)
                },
                refetchQueries: [{ query: GET_ALL_TOPICS, variables: { groupId: Number(id) } }]
            })
            setName("")
            setAddTopicModal(false)
            toast.success("Topic created successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditTopic = async () => {
        if (!name) {
            toast.error("Please enter a topic name")
            return
        }
        try {
            await editTopic({   // This is the mutation 
                variables: {
                    name,
                    topicId: selectedTopic.id
                },
                refetchQueries: [{ query: GET_ALL_TOPICS, variables: { groupId: Number(id) } }]
            })
            setName("")
            setEditTopicModal(false)
            toast.success("Topic updated successfully")

        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteTopic = async (id) => {
        try {
            await deleteTopic({
                variables: {
                    topicId: id
                },
                refetchQueries: [{ query: GET_ALL_TOPICS, variables: { groupId: Number(id) } }]
            })
            toast.success("Topic deleted successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const askForDelete = (id) => {
        if (confirm("Are you sure you want to delete this topic?")) {
            handleDeleteTopic(id)
        }

    }
    // console.log(UIkit)

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Manage Topics</h1>
                <button onClick={() => setAddTopicModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Topic</button>
            </div>
            <div className="mt-4">
                {topics?.getAllTopics.map((topic) => (
                    <div key={topic.id} className="w-full border border-white mb-3 p-3 rounded-lg flex items-center justify-between">
                        <div>
                            <p className='text-md font-bold'>{topic.name}</p>
                            <p className="text-sm">{topic.postCount} posts in this topic</p>
                        </div>
                        <div >
                            {topic.id && <button onClick={() => { setSelectedTopic({ ...topic }); setEditTopicModal(true) }} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>}
                            {topic.id && <button onClick={() => askForDelete(topic?.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>}
                        </div>
                    </div>
                ))}
            </div>

            {/* add topic modal */}
            <ReactModal
                isOpen={addTopicModal}
                contentLabel="Minimal Modal Example"
                className="uk-modal-dialog relative mx-auto bg-white shadow-xl rounded-lg max-lg:w-full dark:bg-dark2 p-5"
                overlayClassName="uk-modal uk-open"
                onRequestClose={() => setAddTopicModal(false)}
            >
                <h1 className="text-2xl font-bold">Add Topic</h1>
                <div className="mt-4 uk-modal-footer">
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Topic Name" className="w-full border border-gray-400 p-2 rounded-lg" />
                    <button type='button' onClick={handleCreateTopic} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" >Add Topic</button>

                </div>
            </ReactModal>


            {/* edit topic modal */}
            <ReactModal
                isOpen={editTopicModal}
                contentLabel="Minimal Modal Example"
                className="uk-modal-dialog relative mx-auto bg-white shadow-xl rounded-lg max-lg:w-full dark:bg-dark2 p-5"
                overlayClassName="uk-modal uk-open"
                onRequestClose={() => setEditTopicModal(false)}
            >
                <h1 className="text-2xl font-bold">Edit Topic</h1>
                <div className="mt-4 uk-modal-footer">
                    <input onChange={(e) => setName(e.target.value)} defaultValue={selectedTopic?.name} type="text" placeholder="Topic Name" className="w-full border border-gray-400 p-2 rounded-lg" />
                    <button type='button' onClick={handleEditTopic} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" >Update Topic</button>

                </div>
            </ReactModal>
        </div>
    )
}

export default ManageTopicTab