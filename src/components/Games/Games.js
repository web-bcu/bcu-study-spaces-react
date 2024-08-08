import { motion } from "framer-motion"
import { staggerContainer } from "../../helpers/motion"
import gameData from "../../data/gameData"
import GamePlay from "../GamePlay"

export default function Games() {
    return (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25}}
            className="sm:px-16 px-6 sm:py-10 py-10 max-w-7xl mx-auto relative z-0"
        >
            <div className="flex flex-wrap gap-7">
                {gameData.map((game, index) => <GamePlay key={index} {...game} index={index} />)}
            </div>
        </motion.section>
    )
}