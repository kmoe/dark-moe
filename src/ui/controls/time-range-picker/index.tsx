import {m} from 'malevic';
import TextBox from '../textbox';
import {getUILanguage} from '../../../utils/locales';
import {parseTime} from '../../../utils/time';

interface TimePickerProps {
    startTime: string;
    endTime: string;
    onChange: ([start, end]: [string, string]) => void;
}

const is12H = (new Date()).toLocaleTimeString(getUILanguage()).endsWith('M');

function toLocaleTime($time: string) {
    const [hours, minutes] = parseTime($time);

    const mm = `${minutes < 10 ? '0' : ''}${minutes}`;

    if (is12H) {
        const h = (hours === 0 ?
            '12' :
            hours > 12 ?
                (hours - 12) :
                hours);
        return `${h}:${mm}${hours < 12 ? 'AM' : 'PM'}`;
    }

    return `${hours}:${mm}`;
}

function to24HTime($time: string) {
    const [hours, minutes] = parseTime($time);
    const mm = `${minutes < 10 ? '0' : ''}${minutes}`;
    return `${hours}:${mm}`;
}

export default function TimeRangePicker(props: TimePickerProps) {
    function onStartTimeChange($startTime: string) {
        props.onChange([to24HTime($startTime), props.endTime])
    }

    function onEndTimeChange($endTime: string) {
        props.onChange([props.startTime, to24HTime($endTime)])
    }

    function setValToStartTime(node: Element) {
        var nodeEl = node as HTMLInputElement
        nodeEl.value = toLocaleTime(props.startTime)
    }

    function setValToEndTime(node: Element) {
        var nodeEl = node as HTMLInputElement
        nodeEl.value = toLocaleTime(props.endTime)
    }

    return (
        <span class="time-range-picker">
            <TextBox
                class="time-range-picker__input time-range-picker__input--start"
                placeholder={toLocaleTime('18:00')}
                didmount={setValToStartTime}
                didupdate={setValToStartTime}
                onchange={(e: any) => onStartTimeChange((e.target as HTMLInputElement).value)}
                onkeypress={(e) => {
                    if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        input.blur();
                        onStartTimeChange(input.value);
                    }
                }}

            />
            <TextBox
                class="time-range-picker__input time-range-picker__input--end"
                placeholder={toLocaleTime('9:00')}
                didmount={setValToEndTime}
                didupdate={setValToEndTime}
                onchange={(e: any) => onEndTimeChange((e.target as HTMLInputElement).value)}
                onkeypress={(e) => {
                    if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        input.blur();
                        onEndTimeChange(input.value);
                    }
                }}
            />
        </span>
    );
}
