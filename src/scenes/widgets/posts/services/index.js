
const sizePerPage = 3;
const urlEnv = process.env.REACT_APP_HOST_POSTS;

export async function fetchPosts(setLoading, token,page, dispatch, posts, setPosts, setLast){
    setLoading(true);
    try{
      const response = await fetch(urlEnv+`/posts?page=${page}&sizePerPage=${sizePerPage}&sortDirection=DESC`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      var newItems = data.content;
      setLast(data.last);
      
      if(!data.first){
          dispatch(setPosts({ posts: [...posts, ...newItems] }));
      } else {
          dispatch(setPosts({ posts: newItems }));
      }
    } catch (err) {
      console.log("Falha a consultar posts")
    } 
    setLoading(false);
}

export async function fetchPostsByUser(setLoading, token,page, dispatch, posts, setPosts, setLast, userId) {
    setLoading(true);
 
    const response = await fetch(
      urlEnv+`/posts/${userId}/posts?page=${page}&sizePerPage=3&sortDirection=DESC`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    try {
      const data = await response.json();
      var newItems = data.content;
      setLast(data.last);
      
      if(!data.first){
          dispatch(setPosts({ posts: [...posts, ...newItems] }));
      } else {
          dispatch(setPosts({ posts: newItems }));
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }