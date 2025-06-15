import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
    const isLoading = useSelector((state) => state.loading.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-[9999] flex flex-col items-center">
            <div className="fixed top-0 left-0 w-full h-[6px] bg-gray-200">
                <div className="h-full bg-blue-600 animate-loading-bar"></div>
            </div>
        </div>
    );
};

export default Loader;
