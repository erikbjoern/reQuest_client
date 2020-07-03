import React from "react";
import Style from "style-it";

class SingleChatBubble extends React.Component {
  me = this.props.message.me
  message = this.props.message.content
  chatBubble = this.me ? "my-bubble" : "your-bubble"
  
  render() {
    return (
      <Style>
        {`
          .my-bubble {
	          position: relative;
	          background: #fff4a1;
            border-radius: .4em;
            padding: 10px;
            margin-bottom: 20px;
          }
          .my-bubble:after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 10%;
            width: 0;
            height: 0;
            border: 15px solid transparent;
            border-right-color: #fff4a1;
	          border-left: 0;
            border-left: 0;
            margin-bottom: -13px;
          }
          .your-bubble {
	          position: relative;
	          background: #b9d4bd;
            border-radius: .4em;
            padding: 10px;
            margin-bottom: 20px;
          }
          .your-bubble:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 10%;
            width: 0;
            height: 0;
            border: 15px solid transparent;
            border-top-color: #b9d4bd;
            border-bottom: 0;
            border-left: 0;
            margin-bottom: -13px;
          }
        `}
        <div className={this.chatBubble}>{this.message}</div>
      </Style>
    );
  }
}

export default SingleChatBubble;
