import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiFetch } from "../api/fetch";
import { useAuth } from "../store/authStore";
import { usePosts } from "../store/postStore";

export default function Posts() {
  const { posts, setPosts, clearPosts } = usePosts();
  const { access, refresh, logout, setTokens } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      // запрашиваем посты
      let res = await apiFetch("/posts", {
        headers: { Authorization: `Bearer ${access}` },
      });
      if (res.status === 401 && refresh) {
        // пробуем обновить токен
        const ref = await apiFetch("/auth/refresh", {
          method: "POST",
          headers: { "refresh-token": refresh },
        });
        if (ref.status === 200) {
          setTokens(ref.tokens);
          res = await apiFetch("/posts", {
            headers: { Authorization: `Bearer ${ref.tokens.access}` },
          });
        } else {
          logout();
          clearPosts();
          nav("/login");
          return;
        }
      }
      if (res.status === 200) setPosts(res.data);
      else {
        logout();
        clearPosts();
        nav("/login");
      }
    })();
  }, [access, refresh, logout, setTokens, setPosts, clearPosts, nav]);

  const addPost = async (e) => {
    e.preventDefault();
    const res = await apiFetch("/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
      body: { title, body },
    });
    if (res.status === 201) {
      setTitle("");
      setBody("");
      setPosts([...posts, res.data]);
    } else {
      alert(res.msg);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <button
        onClick={() => {
          logout();
          clearPosts();
          nav("/login");
        }}
      >
        Logout
      </button>
      <ul>
        {posts.map((p) => (
          <li key={p._id}>
            <strong>{p.title}</strong>: {p.body}
            <strong>{p.body}</strong>: {p.body}
          </li>
        ))}
      </ul>
      <div>
        <h2>Добавить пост</h2>
        <form>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="title"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
          <button onClick={addPost}>Добавить пост в БД</button>
        </form>
      </div>
    </div>
  );
}
