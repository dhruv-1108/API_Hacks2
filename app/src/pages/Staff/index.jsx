import React from 'react'
import { motion } from "framer-motion";
import "./index.css";


const Staff = () => {
    const URI = "https://imabp.github.io/API_Hacks2/data/staffdata.json"
    const [StaffData, setStaffData] = React.useState({ "staff": [] });
    React.useEffect(() => {
        fetch(URI)
            .then((response) => response.json())
            .then((data) => { setStaffData(data) })
            .catch(error => console.log(error))
    }, []);
    return (


        <div className="container">
            {console.log(StaffData)}
            {
                StaffData.staff && StaffData.staff.map((member, id) => {
                    return (
                        <motion.div className="card"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: Math.random(0, 10),
                                    delay: Math.random(0, 4),
                                },
                            }}
                            key={id}>
                            <div className="content">
                                <div className="imgBx">
                                    <img alt={member.name} src={member.img}></img>
                                </div>
                                <div className="contentBx">
                                    <h4>{member.name}</h4>
                                    <h5>{member.description}</h5>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
                )
            }

        </div>

    );
}

export default Staff
