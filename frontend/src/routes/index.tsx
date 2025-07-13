import { createFileRoute, Link } from '@tanstack/react-router'
import Todos from '../components/Todos'
import Todoform from '../components/Todoform'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div className='flex flex-col min-h-screen bg-gray-800 text-white p-10'>

      <Todoform/>
      <Todos/>
      <Link to ="/about"> About </Link>

  </div>
  )
}
