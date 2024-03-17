import React, {FC} from 'react'
import Author from '@/components/ava-text'
import Heart from '@/components/heart'
import {CardBox, Picture, Footer} from './styles.scss'
import {Post} from '@/store/mock-data'

interface CardProps {
  hoverEnabled?: boolean
  post: Post
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}

interface StaticCardBoxProps {
  hoverEnabled?: boolean
  post: Post
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}

const handleError = ({target}) => {
  const newId = Math.floor(Math.random() * 1000)
  const url = target.src.replace(/\d+/, newId)
  target.src = url
}

const Card: FC<CardProps> = ({hoverEnabled, post, onClick}) => (
  <CardBox id={post.id} hoverEnabled={hoverEnabled} onClick={onClick}>
    <Picture src={post.photoUrl} onError={handleError}/>
    <Footer>
      <Author {...post.author} />
      <Heart isRed={post.liked}/>
    </Footer>
  </CardBox>
)

// new stuff start
const StaticCard: FC<StaticCardBoxProps> = ({hoverEnabled, post, onClick}) => (
  <CardBox id={post.id} hoverEnabled={hoverEnabled} onClick={onClick}>
    <Picture src={post.photoUrl} onError={handleError}/>
    <Footer>
      <div>150</div>
    </Footer>
  </CardBox>
)

// new stuff end

export default React.memo(Card,
  (prev, next) => (
    prev.post.liked === next.post.liked &&
    prev.hoverEnabled === next.hoverEnabled
  )
)
