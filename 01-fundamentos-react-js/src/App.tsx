import styles from './App.module.css'
import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'
import {PostType} from './components/Post'
import './global.css'



const posts: PostType[] = [
  {
    id: 1,
    author: {
      name: 'Marcelo Wischniowski',
      avatarUrl: 'https://avatars.githubusercontent.com/u/20583701?v=4',
      role: 'Software Engineer'
    },
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa 👋'
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type: 'link',
        content: 'jane.design/doctorcare'
      },
      {
        type: 'link',
        content: '#novoprojeto #nlw #rocketseat'
      },
    ],
    publishedAt: new Date("2023-03-29 17:13:00"),
  },
  {
    id: 2,
    author: {
      name: ' Wischniowski',
      avatarUrl: 'https://avatars.githubusercontent.com/u/20583701?v=4',
      role: 'Software Engineer'
    },
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa 👋'
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type: 'link',
        content: 'jane.design/doctorcare'
      },
      {
        type: 'link',
        content: '#novoprojeto #nlw #rocketseat'
      },
    ],
    publishedAt: new Date("2023-03-29 08:13:00"),
  },
]

function App() {

  return (
    <div className="">
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => (
              <Post 
              key={post.id} 
              post={post}
              />
            ))
          }
        </main>
      </div>
    
    </div>
  )
}

export default App
