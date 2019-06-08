import {m} from 'malevic';
import {Button, Toggle} from '../../../controls';
import {getLocalMessage} from '../../../../utils/locales';

interface ModeToggleProps {
    mode: number;
    onChange: (mode: number) => void;
}

export default function ModeToggle({mode, onChange}: ModeToggleProps) {
    return (
        <div class="mode-toggle">
            <div class="mode-toggle__line">
                <Button
                    class={{'mode-toggle__button--active': mode === 1}}
                    onclick={() => onChange(1)}
                >
                </Button>
                <Toggle
                    checked={mode === 1}
                    labelOn={getLocalMessage('dark')}
                    labelOff={getLocalMessage('light')}
                    onChange={(checked) => onChange(checked ? 1 : 0)}
                />
                <Button
                    class={{'mode-toggle__button--active': mode === 0}}
                    onclick={() => onChange(0)}
                >
                </Button>
            </div>
            <label class="mode-toggle__label">{getLocalMessage('mode')}</label>
        </div>
    );
}
