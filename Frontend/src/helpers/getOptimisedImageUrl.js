const optimise = (url, size=800) => {
    return url.replace('/upload/', `/upload/w_${size},q_auto,f_auto/`)
}

export default optimise