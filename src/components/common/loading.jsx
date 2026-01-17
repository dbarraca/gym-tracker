import {useState, useEffect} from 'react';

const Loading = () => {
    const [progress, setProgress] = useState(false);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            console.log('set progress inerval');
            setProgress(prev => !prev);
        }, 1000);

        return (() => {
            clearInterval(progressInterval);
        })
    }, [])


    // console.log('loading');
    return (
        <div className={`w-full h-full loading-container${progress ? ' loading-progress' : ''}`}>
            <div className='w-full h-full loading' />
        </div>
    )
}

export default Loading;