import { getAllToddosQueryOptions } from "../lib/api/todos"
import { useQuery } from "@tanstack/react-query"

export default function Todos(){

    const {data:todosQuery} = useQuery(getAllToddosQueryOptions())
    console.log(todosQuery)
    return <div className="text-center text-6xl mt-20">
        {todosQuery?.map((todo)=> (
            <div>
                {todo.title}
                {todo.description}
            </div>
        ))}
    </div>
}