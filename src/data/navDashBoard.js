import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForumbee,   } from '@fortawesome/free-brands-svg-icons';
import { faFile, faUsers, faGamepad } from '@fortawesome/free-solid-svg-icons';

export const NavDashBoards = [
    {
        link: "/forum",
        name: "Forum",
        icon: (
            <FontAwesomeIcon icon={faForumbee} />
        ),
    },
    {
        link: "/document",
        name: "Documents",
        icon: (
            <FontAwesomeIcon icon={faFile} />
        )
    },
    {
        link: "/games",
        name: "Games",
        icon: (
            <FontAwesomeIcon icon={faGamepad} />
        )
    },
    // {
    //     link: "/dashboard/groups",
    //     name: "Groups",
    //     icon: (
    //         <FontAwesomeIcon icon={faUsers} />
    //     )
    // }
]