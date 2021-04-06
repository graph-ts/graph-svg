import { ComponentType, FC, useState } from 'react';
import { Example0 } from './Example0';
import { Example1 } from './Example1';
import { Example2 } from './Example2';
import { Example3 } from './Example3';
import { Example4 } from './Example4';

const ExampleExplorer: FC = props => {

    const [example, setExample] = useState<number>(4);

    const examples: [number, ComponentType][] = [
        [0, Example0],
        [1, Example1],
        [2, Example2],
        [3, Example3],
        [4, Example4]
    ];

    const Example = examples[example][1];

    return <div className={'container'}>
        <div className={'sidebar'}>
            <div className={'header'}>Graph SVG Examples</div>
            {
                examples.map(([index, _]) => {
                    const className = `button ${index === example ? 'selected' : ''}`;
                    return <div
                        key={index}
                        className={className}
                        onClick={() => setExample(index)}>
                        Example { index }
                    </div>
                })
            }
        </div>
        <div className={'example'}>
            <Example/>
        </div>
    </div>

}

export { ExampleExplorer };