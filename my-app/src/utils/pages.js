import Loader from "../components/UI/Loader/Loader"

export const getPagesCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    let result = []
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)       
    }
    return result;
}

export const HandleRequest = (isPostLoading, error, callback) => {
    if(isPostLoading) 
      return (<div style={{
        display: 'flex', 
        justifyContent: 'center',
        marginTop: '40%'}}>
          <Loader></Loader>
      </div>)
    if(error){
      return `Error occured "${error.message}"`
    }
    return callback()
    // if (posts.length === 0) return "No posts"
    // return "Posts list"
  }