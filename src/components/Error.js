import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
    return (
        <div>
            <h1>Oops!!</h1>
            <h1>Something went wrong</h1>
            <h3>{error.status}:{error.statusText}</h3>
        </div>
    )
}

export default Error