import React from 'react'
import SingleChatBubble from './SingleChatBubble'
import ScrollableFeed from 'react-scrollable-feed'

const ChatBubbles = ({ messages }) => {
  const chatBubbles = messages.map((message) => (
    <SingleChatBubble message={message}/>
  ))

  return (
    <ScrollableFeed forceScroll="true">
      {chatBubbles}
    </ScrollableFeed>
  )
}

export default ChatBubbles
