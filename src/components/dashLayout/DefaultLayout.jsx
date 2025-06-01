'use client'
import React from 'react'
import SideMenu from './SideMenu';


const DefaultLayout = ({ children }) => {

    return (
        <>
            <section className="dashboard-section section_wrap" style={{
                backgroundImage: `url('/new/assets/img/nominate-hotel-bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="container-fluid">
                    <div className="app">
                        <div className="row dashLayout">
                            <div className="col-md-4 col-xxl-3 theia-sticky">
                                <SideMenu Link="Link" />
                            </div>
                            <div className="col-md-8 col-xxl-9">
                                <div className="content-rightBox">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DefaultLayout

