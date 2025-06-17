import React from 'react';
import { useDeleteUsersMutation, useGetUsersQuery } from '../../features/apiSlice';
import { useSearchParams } from 'react-router-dom';

const PostList = ({ handleEdit }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 5;

    const { data, isLoading, isError } = useGetUsersQuery({ page, limit });
    const [deleteUsers] = useDeleteUsersMutation();

    const users = data?.users || [];
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / limit);

    const handleDelete = async (id) => {
        try {
            await deleteUsers(id);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-red-600 font-medium mt-6">Error fetching users.</div>;
    }

    return (
        <>
            <div style={{ width: "600px", margin: "3rem auto" }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Users</h2>

                <div className="flex flex-col gap-3">
                    {users.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md hover:shadow-lg transition rounded-2xl p-3 border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 font-bold h-12 w-12 flex items-center justify-center rounded-full text-lg uppercase">
                                    {item.username?.[0] || "U"}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{item.username}</p>
                                    <p className="text-sm text-gray-500">{item.email}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="rounded bg-red-500 hover:bg-red-600 text-white px-3 py-1"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        handleEdit(item);
                                    }}
                                    className="rounded bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Only show pagination if totalCount > limit */}
            {totalCount > limit && (
                <div className="flex justify-center gap-2 my-4">
                    <button
                        className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-300' : 'bg-indigo-500 text-white'}`}
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Previous
                    </button>

                    <span className="px-3 py-1 rounded bg-gray-200">{page} / {totalPages}</span>

                    <button
                        className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-300' : 'bg-indigo-500 text-white'}`}
                        disabled={page === totalPages}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default PostList;
