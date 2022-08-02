import Layout from "../components/layout";
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAppContext } from "../store/store";

export default function View() {

    const [item, setItem] = useState()
    const params = useParams()

    const store = useAppContext()

    useEffect(() => {
        const book = store.getItem(params.bookId)
        setItem(book)
    }, []);

    if(!item) return <Layout>Item not found</Layout>

    return (
        <Layout>
            <h2>{item?.title}</h2>
            {
                item?.cover
                    ? <img src={item.cover} alt={item.title} /> 
                    : ""
            }
            <div>
                {item?.intro}
            </div>
            <div>
                {
                    item?.completed
                        ? "Terminado"
                        : "por terminar"
                }
            </div>
            <div>
                {item?.review}   
            </div>
        </Layout>
    )
}