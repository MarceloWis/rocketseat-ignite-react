import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, FormEvent, InvalidEvent, ChangeEvent } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface Contentpost  {
  type: "paragraph" | "link";
  content: string;
};

interface Authorpost  {
  name: string;
  avatarUrl: string;
  role: string;
};

export interface PostType {
  id: number;
  author: Authorpost;
  content: Contentpost[];
  publishedAt: Date;
}

interface Postpost  {
  post: PostType;
};

export function Post({ post }: Postpost) {
  const [comments, setComments] = useState<string[]>(["Comentário 1"]);

  const [newCommentText, setNewCommentText] = useState<string>("");

  const datePublishedFormated = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value);
  }

  function deleteComment(comment: string) {
    const newComments = comments.filter((item) => item !== comment);
    setComments(newComments);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Escreva um comentário antes de enviar!")
  }

  const isNewCommentValid = newCommentText.length > 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={datePublishedFormated}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((content, index) => {
          if (content.type === "paragraph") {
            return <p key={content.content}>{content.content}</p>;
          } else if (content.type === "link") {
            return (
              <p key={content.content}>
                <a>{content.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu comentário</strong>

        <textarea
          onChange={handleNewCommentTextChange}
          value={newCommentText}
          name="comment"
          placeholder="Escreva um comentário..."
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentValid}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, index) => {
          return (
            <Comment
              onDeleteComment={deleteComment}
              content={comment}
              key={comment}
            />
          );
        })}
      </div>
    </article>
  );
}
