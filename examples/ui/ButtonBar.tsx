import { FC } from 'react';
import './button-bar.scss';
import classNames from 'classnames';

interface ButtonProps {
    onClick: () => void
    disabled?: boolean
}

export const ButtonBar: FC = props => {
    return <div className={'button-bar'}>
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