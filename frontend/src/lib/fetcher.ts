const Fetcher = (fetchURL: string, isPost: boolean = false, data: object = {}) => {

    if (isPost)
        return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${fetchURL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${fetchURL}`)
}

export default Fetcher;