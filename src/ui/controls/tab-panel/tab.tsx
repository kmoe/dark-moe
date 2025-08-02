import {m} from 'malevic';

interface whatever {
    isActive: boolean;
}

export default function Tab({isActive}: whatever, ...children: any) {

    const tabCls = {
        'tab-panel__tab': true,
        'tab-panel__tab--active': isActive
    };

    return (
        <div class={tabCls}>
            {children}
        </div>
    );
}
