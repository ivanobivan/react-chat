import React, {Component} from 'react';
import Square from './Square';
import {KNIGHT} from '../../constants/const';
import {DropTarget} from 'react-dnd';
import {checkPoint} from "../../api/api";

const squareTarget = {
    canDrop(props) {
        const [x, y] = props.knightPosition;
        const dx = props.x - x;
        const dy = props.y - y;
        return checkPoint(dx, dy);
    },

    drop(props) {
        console.log(props.x, props.y);
        props.setPosition(props.x, props.y);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class BoardSquare extends Component {

    renderOverlay(color) {
        return (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 1,
                opacity: 0.5,
                backgroundColor: color,
            }}/>
        );
    }

    render() {
        const {x, y, connectDropTarget, isOver, canDrop} = this.props;
        const black = (x + y) % 2 === 1;

        return connectDropTarget(
            <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}>
                <Square black={black}>
                    {this.props.children}
                </Square>
                {isOver && !canDrop && this.renderOverlay('red')}
                {!isOver && canDrop && this.renderOverlay('yellow')}
                {isOver && canDrop && this.renderOverlay('green')}
            </div>
        );
    }
}

export default DropTarget(KNIGHT, squareTarget, collect)(BoardSquare);