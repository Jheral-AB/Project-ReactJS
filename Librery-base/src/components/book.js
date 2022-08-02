import { Link } from 'react-router-dom'

export default function Book({ item }) {

    return (
        <div>
            <Link to={`/view/${item.id}`}>
                <img src={item.cover} alt={item.title} />
                <div>
                    {item.title}
                </div>
            </Link>
        </div>
    )
}