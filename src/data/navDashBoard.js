import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForumbee } from '@fortawesome/free-brands-svg-icons';
import { faFile, faGamepad, faSave } from '@fortawesome/free-solid-svg-icons';

export const NavDashBoards = [
    {
        link: "/document",
        name: "Documents",
        icon: (
            <FontAwesomeIcon icon={faFile} />
        )
    },
    {
        link: "/forum",
        name: "Forum",
        icon: (
            <FontAwesomeIcon icon={faForumbee} />
        ),
    },
    {
        link: "/games",
        name: "Games",
        icon: (
            <FontAwesomeIcon icon={faGamepad} />
        )
    },
    {
        link: "/saved_posts",
        name: "Saved Posts",
        icon: (
            <FontAwesomeIcon icon={faSave} />
        )
    }
]