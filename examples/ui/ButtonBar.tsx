import { FC } from 'react';
import './button-bar.scss';
import classNames from 'classnames';

interface ButtonProps {
    onClick: () => void
    disabled?: boolean
}

interface ButtonBarProps {
    vertical?: boolean
}

export const ButtonBarContainer: FC<ButtonBarProps> = props => {
    const direction = props.vertical ? 'vertical' : 'horizontal';
    return <div className={`button-bar-container ${direction}`}>
        { props.children }
    </div>
}

export const ButtonBar: FC<ButtonBarProps> = props => {
    const direction = props.vertical ? 'vertical' : 'horizontal';
    return <div className={`button-bar ${direction}`}>
        { props.children }
    </div>
}

export const Button: FC<ButtonProps> = props => {
    return <div
        className={classNames('button', { disabled: props.disabled })}
        onClick={() => {if (props.disabled !== true) props.onClick()}}>
        { props.children }
    </div>
}

export const Separator: FC = () => {
    return <div className={'separator'}/>
}