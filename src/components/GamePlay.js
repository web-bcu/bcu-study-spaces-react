import { motion } from "framer-motion"
import { fadeIn } from "../helpers/motion"
import { Tilt } from "react-tilt"
import { Link } from "react-router-dom"

export default function GamePlay({name, image, description, link, index}) {
    return (
        <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
            <Tilt
                options = {{
                    max: 45,
                    scale: 1, 
                    speed: 450
                }}
                className="bg-gradient-to-r from-[#432371] to-[#faae7b] p-5 rounded-2xl sm:w-[320px] w-full"
            >
                <Link to={link} className='w-full h-fit flex flex-col gap-2'>
                    <img src={image} alt={name} className='w-96 h-72 object-cover rounded-2xl' />
                    <p className="text-white text-center">{name}</p>
                </Link>
            </Tilt>
        </motion.div>
    )
}