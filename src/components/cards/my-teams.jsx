import React from 'react'


const Myteams = () => {
    const teams = [
        {
            img: '/new/assets/img/team-img1.webp',
            memberName:"Tanya",
            role:"CEO"
        },
        {
            img: '/new/assets/img/team-img2.webp',
            memberName:"JOHN",
            role:"EDITER"
        },
        {
            img: '/new/assets/img/team-img3.webp',
            memberName:"CONSTANTINOS",
            role:"ONLINE DEVELOPER"
        },
        {
            img: '/new/assets/img/team-img4.webp',
            memberName:"Denis",
            role:"Uk Office director"
        },
        {
            img: '/new/assets/img/team-img5.webp',
            memberName:"DOULTON",
            role:"DIGITAL OFFICER"
        },
    ];
    return (
        <>
            
            <div className="row">
                {teams.map((team, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={index} style={{marginRight:"-13px"}}>
                        <div className="hotel-cards">
                            <div className="hotel-img">
                                <img src={team.img} alt={team.magazinesName} />
                            </div>
                            <div className="hotel-content">
                                <div className="teams-name">{team.memberName}</div>
                                <div className="teams-role">{team.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Myteams