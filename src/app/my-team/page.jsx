import Myteams from '@component/components/cards/my-teams'
import HeadingWithoutSwiper from '@component/components/headingWithoutSwiper'
import VideoContainer from '@component/components/home/VideoContainer'
import React from 'react'

const page = () => {
    return (
        <>
            <section className='Magazines-section myTeamSec'>
            
        <VideoContainer />
   
                <HeadingWithoutSwiper name={"Meet the team"} />
                <div className='container whater-effect section-padding'>
                    <Myteams />
                </div>
            </section>
        </>
    )
}

export default page