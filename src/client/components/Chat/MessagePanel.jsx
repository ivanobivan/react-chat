import React from 'react';

export default class MessagePanel extends React.Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };
    componentDidUpdate() {
        this.scrollToBottom();
    };
    render() {
        return (
            <div className="messagePanel__chatSide">
                {this.props.messagePull.map(elem => {
                    return (
                        <div className="oneMessage__messagePanel">
                            <div className="name__oneMessage">{elem.username}</div>
                            <div className="value__oneMessage">{elem.message}</div>
                        </div>
                    )
                })}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}